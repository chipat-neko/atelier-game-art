/* =========================================================================
   revision.js — Flashcards de révision (revision.html).
   Source : window.GLOSSAIRE (termes du glossaire). Système Leitner (5 boîtes)
   persistant dans ag-revision = { "<terme>": { box:1..5, due:ms } }.
   100% local, aucun fetch.
   ========================================================================= */
(function () {
  "use strict";
  if (!window.GLOSSAIRE) return;
  var KEY = "ag-revision";
  var DAY = 86400000;
  var INTERVAL = { 1: 0, 2: 1 * DAY, 3: 3 * DAY, 4: 7 * DAY, 5: 14 * DAY };

  function $(id) { return document.getElementById(id); }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // Associe chaque terme à sa piste via l'id de leçon source (src).
  var lessonPiste = {};
  if (window.SITE_DATA) {
    (window.SITE_DATA.flat || []).forEach(function (l) { lessonPiste[l.id] = { id: l.pisteId, titre: l.pisteTitre, href: l.href }; });
  }
  function pisteOf(card) { var s = card.src && lessonPiste[card.src]; return s || null; }

  // Catalogue de cartes (dédoublonné par terme).
  var seen = {}, CARDS = [];
  window.GLOSSAIRE.forEach(function (g) {
    if (!g.terme || seen[g.terme]) return;
    seen[g.terme] = 1;
    CARDS.push(g);
  });

  var state = load();
  var queue = [], pos = 0, flipped = false, currentFilter = "all", onlyDone = false;

  function due(term) { var r = state[term]; return !r || (r.due || 0) <= Date.now(); }
  function filtered() {
    return CARDS.filter(function (c) {
      if (onlyDone && !(window.Progress && c.src && window.Progress.isDone(c.src))) return false;
      if (currentFilter === "all") return true;
      var p = pisteOf(c); return p && p.id === currentFilter;
    });
  }

  /* ---- Filtre « seulement mes leçons terminées » ---- */
  (function () {
    var cb = $("rv-done-only"); if (!cb) return;
    cb.addEventListener("change", function () { onlyDone = cb.checked; startSession(); });
  })();

  /* ---- Filtre par piste ---- */
  (function () {
    var sel = $("rv-filter"); if (!sel || !window.SITE_DATA) return;
    var html = '<option value="all">Toutes les pistes</option>';
    window.SITE_DATA.pistes.forEach(function (p) {
      var n = CARDS.filter(function (c) { var pp = pisteOf(c); return pp && pp.id === p.id; }).length;
      if (n) html += '<option value="' + p.id + '">' + p.titre + ' (' + n + ')</option>';
    });
    sel.innerHTML = html;
    sel.addEventListener("change", function () { currentFilter = sel.value; startSession(); });
  })();

  function refreshStats() {
    var pool = filtered();
    var dueN = pool.filter(function (c) { return due(c.terme); }).length;
    var mastered = pool.filter(function (c) { return state[c.terme] && state[c.terme].box >= 5; }).length;
    if ($("rv-due")) $("rv-due").textContent = dueN;
    if ($("rv-total")) $("rv-total").textContent = pool.length;
    if ($("rv-mastered")) $("rv-mastered").textContent = mastered;
  }

  function startSession(all) {
    var pool = filtered();
    queue = shuffle(pool.filter(function (c) { return all || due(c.terme); }));
    pos = 0; flipped = false;
    refreshStats();
    render();
  }

  function gradeBox(term) { return (state[term] && state[term].box) || 1; }

  function answer(known) {
    var card = queue[pos]; if (!card) return;
    var box = gradeBox(card.terme);
    box = known ? Math.min(5, box + 1) : 1;
    state[card.terme] = { box: box, due: Date.now() + (INTERVAL[box] || 0) };
    save(state);
    if (window.Progress && window.Progress.logActivity) window.Progress.logActivity();
    pos++; flipped = false;
    refreshStats();
    render();
  }

  function render() {
    var stage = $("rv-stage"); if (!stage) return;

    if (!queue.length) {
      stage.innerHTML = '<div class="rv-empty"><p>🎉 Rien à réviser ici pour l’instant&nbsp;!</p>' +
        '<button class="btn btn-ghost" id="rv-all">Réviser quand même tout le lot</button></div>';
      var b = $("rv-all"); if (b) b.addEventListener("click", function () { startSession(true); });
      setBar(); return;
    }
    if (pos >= queue.length) {
      stage.innerHTML = '<div class="rv-empty"><p>✅ Session terminée — ' + queue.length + ' carte' + (queue.length > 1 ? 's' : '') + ' révisée' + (queue.length > 1 ? 's' : '') + '.</p>' +
        '<button class="btn btn-primary" id="rv-again">Nouvelle session</button></div>';
      var a = $("rv-again"); if (a) a.addEventListener("click", function () { startSession(); });
      setBar(); return;
    }

    var card = queue[pos];
    var p = pisteOf(card);
    var box = gradeBox(card.terme);
    var aliasLine = (card.alias && card.alias.length) ? '<p class="rv-alias">Aussi : ' + card.alias.join(", ") + '</p>' : "";
    var lessonLink = p ? '<a class="rv-lesson" href="' + (window.SITE_ROOT || "") + p.href + '">Voir la leçon (' + p.titre + ') →</a>' : "";

    stage.innerHTML =
      '<div class="rv-card' + (flipped ? ' is-flipped' : '') + '" id="rv-card">' +
        '<div class="rv-face rv-front">' +
          '<span class="rv-box">Boîte ' + box + '/5</span>' +
          '<div class="rv-term">' + card.terme + '</div>' +
          '<span class="rv-hint">Clique pour révéler la définition</span>' +
        '</div>' +
        '<div class="rv-face rv-back">' +
          '<div class="rv-def">' + card.def + '</div>' + aliasLine + lessonLink +
        '</div>' +
      '</div>' +
      '<div class="rv-controls" ' + (flipped ? '' : 'hidden') + '>' +
        '<button class="btn btn-danger" id="rv-no">À revoir</button>' +
        '<button class="btn btn-primary" id="rv-yes">Je savais</button>' +
      '</div>' +
      '<p class="rv-progress-txt">Carte ' + (pos + 1) + ' / ' + queue.length + '</p>';

    var cardEl = $("rv-card");
    // Opérable au clavier : focusable + Entrée/Espace pour révéler.
    cardEl.tabIndex = 0;
    cardEl.setAttribute("role", "button");
    cardEl.setAttribute("aria-label", flipped ? "Définition affichée" : "Cliquer ou Entrée pour révéler la définition");
    cardEl.addEventListener("click", function () { if (!flipped) { flipped = true; render(); } });
    cardEl.addEventListener("keydown", function (e) {
      if (!flipped && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); flipped = true; render(); }
    });
    if (flipped) {
      $("rv-yes").addEventListener("click", function (e) { e.stopPropagation(); answer(true); });
      $("rv-no").addEventListener("click", function (e) { e.stopPropagation(); answer(false); });
    }
    setBar();
  }

  function setBar() {
    var fill = $("rv-bar"); if (!fill) return;
    var pct = queue.length ? Math.round(pos / queue.length * 100) : 0;
    fill.style.width = pct + "%";
  }

  // Raccourcis clavier : Espace = révéler, ←/→ = à revoir / je savais
  document.addEventListener("keydown", function (e) {
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (!queue.length || pos >= queue.length) return;
    if (e.key === " ") { e.preventDefault(); if (!flipped) { flipped = true; render(); } }
    else if (flipped && (e.key === "ArrowRight")) { answer(true); }
    else if (flipped && (e.key === "ArrowLeft")) { answer(false); }
  });

  startSession();
})();
