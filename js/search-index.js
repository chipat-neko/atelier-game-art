/* =========================================================================
   search-index.js — Recherche full-text côté client, 100% local.
   AUCUN fetch : indexe les données déjà embarquées (window.SITE_DATA,
   window.GLOSSAIRE) en mémoire. Expose window.Search (modal + moteur).
   Chargé après site-data.js et (si présent) glossaire-data.js.
   ========================================================================= */
(function () {
  "use strict";
  var ROOT = window.SITE_ROOT || "";

  /* --- Normalisation (insensible aux accents & à la casse) --- */
  function norm(s) {
    return (s || "").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[œ]/g, "oe").replace(/[æ]/g, "ae");
  }

  /* --- Construction de l'index --- */
  var INDEX = [];
  function buildIndex() {
    INDEX = [];
    if (window.SITE_DATA && window.SITE_DATA.flat) {
      window.SITE_DATA.flat.forEach(function (l) {
        INDEX.push({
          type: "lecon",
          kicker: l.pisteTitre,
          title: l.titre,
          excerpt: l.desc,
          href: ROOT + l.href,
          hay: norm(l.titre + " " + l.desc + " " + (l.motscles || []).join(" ") + " " + l.pisteTitre)
        });
      });
    }
    if (window.GLOSSAIRE) {
      window.GLOSSAIRE.forEach(function (g) {
        INDEX.push({
          type: "terme",
          kicker: "Glossaire",
          title: g.terme,
          excerpt: g.def,
          href: ROOT + "glossaire.html#g-" + slug(g.terme),
          hay: norm(g.terme + " " + g.def + " " + (g.alias || []).join(" "))
        });
      });
    }
  }
  function slug(s) {
    return norm(s).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  /* --- Scoring : tous les mots de la requête doivent matcher --- */
  function search(q) {
    var nq = norm(q).trim();
    if (nq.length < 2) return [];
    var words = nq.split(/\s+/);
    var res = [];
    INDEX.forEach(function (item) {
      var score = 0, ok = true;
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        var inTitle = norm(item.title).indexOf(w) !== -1;
        var inHay = item.hay.indexOf(w) !== -1;
        if (!inHay) { ok = false; break; }
        score += inTitle ? 10 : 2;
        if (norm(item.title) === nq) score += 50;
        if (norm(item.title).indexOf(nq) === 0) score += 8;
      }
      if (ok) {
        if (item.type === "lecon") score += 3; // priorité légère aux leçons
        res.push({ item: item, score: score });
      }
    });
    res.sort(function (a, b) { return b.score - a.score; });
    return res.slice(0, 12).map(function (r) { return r.item; });
  }

  /* --- Surlignage --- */
  // Repli d'UN caractère original vers sa forme normalisée (longueur 0, 1 ou 2 : œ→oe…).
  function fold(c) {
    return c.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/œ/g, "oe").replace(/æ/g, "ae");
  }
  function highlight(text, q) {
    var words = norm(q).trim().split(/\s+/).filter(function (w) { return w.length > 1; });
    if (!words.length) return esc(text);
    // Chaîne normalisée + table d'index : map[j] = index du caractère ORIGINAL.
    // Robuste même si la normalisation change la longueur (œ/æ, casse particulière).
    var n = "", map = [];
    for (var i = 0; i < text.length; i++) {
      var f = fold(text[i]);
      for (var k = 0; k < f.length; k++) { n += f[k]; map.push(i); }
    }
    var marks = new Array(text.length).fill(false);
    words.forEach(function (w) {
      var from = 0, idx;
      while ((idx = n.indexOf(w, from)) !== -1) {
        for (var k = idx; k < idx + w.length; k++) marks[map[k]] = true;
        from = idx + w.length;
      }
    });
    var out = "", p = 0;
    while (p < text.length) {
      if (marks[p]) {
        var j = p; while (j < text.length && marks[j]) j++;
        out += "<mark>" + esc(text.slice(p, j)) + "</mark>"; p = j;
      } else { out += esc(text[p]); p++; }
    }
    return out;
  }
  function esc(s) { return (s || "").replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  /* --- Modal --- */
  var modal, input, results, sel = -1, current = [];
  function ensureModal() {
    if (modal) return;
    modal = document.createElement("div");
    modal.className = "search-modal";
    modal.innerHTML =
      '<div class="search-panel" role="dialog" aria-label="Recherche">' +
        '<div class="sp-input">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
          '<input type="text" id="sp-input" placeholder="Rechercher une leçon, un terme…" autocomplete="off" spellcheck="false">' +
        '</div>' +
        '<div class="search-results" id="sp-results"></div>' +
        '<div class="search-foot"><span><kbd>↑</kbd><kbd>↓</kbd> naviguer</span><span><kbd>Entrée</kbd> ouvrir</span><span><kbd>Échap</kbd> fermer</span></div>' +
      '</div>';
    document.body.appendChild(modal);
    input = modal.querySelector("#sp-input");
    results = modal.querySelector("#sp-results");

    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    input.addEventListener("input", function () { render(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") { e.preventDefault(); go(); }
      else if (e.key === "Escape") { close(); }
    });
  }

  function render(q) {
    current = search(q); sel = current.length ? 0 : -1;
    if (!q || q.trim().length < 2) {
      results.innerHTML = '<div class="search-empty">Tape au moins 2 caractères. Essaie « PBR », « UV », « Lumen », « draw call »…</div>';
      return;
    }
    if (!current.length) {
      results.innerHTML = '<div class="search-empty">Aucun résultat pour « ' + esc(q) + ' ».</div>';
      return;
    }
    results.innerHTML = current.map(function (it, i) {
      return '<a class="sr-item' + (i === 0 ? " sel" : "") + '" href="' + it.href + '" data-i="' + i + '">' +
        '<div class="sr-piste">' + esc(it.kicker) + (it.type === "terme" ? " · terme" : "") + '</div>' +
        '<div class="sr-title">' + highlight(it.title, q) + '</div>' +
        '<div class="sr-excerpt">' + highlight((it.excerpt || "").slice(0, 130), q) + '</div>' +
      '</a>';
    }).join("");
    Array.prototype.forEach.call(results.querySelectorAll(".sr-item"), function (a) {
      a.addEventListener("mouseenter", function () { setSel(+a.dataset.i); });
    });
  }
  function setSel(i) {
    sel = i;
    Array.prototype.forEach.call(results.querySelectorAll(".sr-item"), function (a, k) {
      a.classList.toggle("sel", k === i);
    });
  }
  function move(d) {
    if (!current.length) return;
    sel = (sel + d + current.length) % current.length;
    setSel(sel);
    var node = results.querySelectorAll(".sr-item")[sel];
    if (node) node.scrollIntoView({ block: "nearest" });
  }
  function go() {
    if (sel >= 0 && current[sel]) window.location.href = current[sel].href;
  }
  function open() {
    ensureModal();
    modal.classList.add("open");
    input.value = ""; render("");
    setTimeout(function () { input.focus(); }, 30);
  }
  function close() {
    if (!modal) return;
    modal.classList.remove("open");
    sel = -1; current = [];
    if (results) results.innerHTML = "";
  }

  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

  window.Search = { open: open, close: close, query: search, _build: buildIndex };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", buildIndex);
  else buildIndex();
})();
