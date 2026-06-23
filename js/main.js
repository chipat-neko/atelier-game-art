/* =========================================================================
   main.js — Navigation, thème, sidebar, sommaire (TOC), menu mobile.
   Dépend de : site-data.js (window.SITE_DATA), progress.js (window.Progress).
   Aucun fetch. Compatible file://.
   Conventions de page :
     window.SITE_ROOT  = préfixe relatif vers la racine ("", "../../", …)
     window.CURRENT_LESSON = id de la leçon courante (ex. "f01") ou undefined.
   ========================================================================= */
(function () {
  "use strict";
  var ROOT = window.SITE_ROOT || "";
  var DATA = window.SITE_DATA;
  var CUR = window.CURRENT_LESSON || null;

  /* ---------- Icônes SVG (inline, hors-ligne) ---------- */
  var ICONS = {
    cube:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/></svg>',
    tools:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    unity:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5 7.6 4.95 6.3 9.4l-2.9.0L12 2.5zm0 0 4.4 2.45 1.3 4.45 2.9 0L12 2.5zM3.4 9.4l2.9 0 3.2 5.5-2.2 3.9L3.4 9.4zm17.2 0-3.9 9.4-2.2-3.9 3.2-5.5 2.9 0zM7.4 18.6l2.2-3.9 6.8 0 2.2 3.9L12 21.5l-4.6-2.9z"/></svg>',
    unreal:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9.2"/><path d="M12 6.4c-3 .8-4.6 3-4.6 5.2 0 1.1.6 1.8 1.3 1.5.5-.2.5-.8.4-1.4-.1-1 .4-1.8 1-2.1l-.5 4.6c2.1 1.6 4.4 1.3 6.2-.7-1 .5-1.9.5-2.5.1l1.3-1-.1-1.3 1.2-.5c-1-2-2.6-3.4-3.7-4z" fill="currentColor" stroke="none"/></svg>',
    bridge:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20M4 12V8m16 4V8M7 12v5m5-5v5m5-5v5M2 8c2.5 0 3.5-2 5-2s2.5 2 5 2 3.5-2 5-2 2.5 2 3 2"/></svg>',
    blender: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="13" r="6"/><path d="M14 13h6.5M3.5 14.5 11 11"/><circle cx="14" cy="13" r="1.6" fill="currentColor" stroke="none"/></svg>',
    godot:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M12 7.4v4M12 11.4 6.8 15.8M12 11.4l5.2 4.4"/></svg>',
    code:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    terminal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="16" rx="2"/><polyline points="6.5 9 9.5 12 6.5 15"/><line x1="12" y1="15" x2="16" y2="15"/></svg>',
    braces:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4H7a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1"/><path d="M16 4h1a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-1"/></svg>',
    sparkles:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"/><path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8 .8-2z"/></svg>',
    scroll:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H6a2 2 0 0 0-2 2v13a3 3 0 0 0 3 3h11a2 2 0 0 0 2-2v-1H8"/><path d="M18 3a2 2 0 0 1 2 2v11"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="12" x2="14" y2="12"/></svg>',
    nodes:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="7" height="6" rx="1.5"/><rect x="14.5" y="14" width="7" height="6" rx="1.5"/><path d="M9.5 7h3a2 2 0 0 1 2 2v8"/></svg>',
    check:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    arrowL:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    arrowR:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
  };
  window.SITE_ICONS = ICONS;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* ---------- Thème clair/sombre ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("ag-theme", t); } catch (e) {}
  }
  function initTheme() {
    var saved;
    try { saved = localStorage.getItem("ag-theme"); } catch (e) {}
    if (saved) applyTheme(saved);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      applyTheme(cur === "light" ? "dark" : "light");
    });
  }

  /* ---------- Palette d'accent ---------- */
  var ACCENTS = [
    { id: "cyan",      label: "Cyan",      color: "#38bdf8" },
    { id: "emeraude",  label: "Émeraude",  color: "#34d399" },
    { id: "ambre",     label: "Ambre",     color: "#fbbf24" },
    { id: "violet",    label: "Violet",    color: "#a78bfa" },
    { id: "framboise", label: "Framboise", color: "#fb7185" },
    { id: "indigo",    label: "Indigo",    color: "#818cf8" }
  ];
  function applyAccent(id) {
    if (!id) id = "cyan";
    // Pose toujours data-accent (y compris « cyan ») pour que les palettes
    // s'appliquent dans tous les thèmes, y compris l'habillage Atelier/Studio.
    document.documentElement.setAttribute("data-accent", id);
    try { localStorage.setItem("ag-accent", id); } catch (e) {}
    var pop = document.getElementById("accent-pop");
    if (pop) pop.querySelectorAll(".accent-sw").forEach(function (sw) {
      sw.classList.toggle("is-active", sw.dataset.accent === id);
    });
  }
  function initAccent() {
    var saved;
    try { saved = localStorage.getItem("ag-accent"); } catch (e) {}
    if (saved) applyAccent(saved);
    var header = document.querySelector(".site-header");
    var themeBtn = document.getElementById("theme-toggle");
    if (!header || !themeBtn) return;

    var wrap = el("div", "accent-picker");
    var btn = el("button", "icon-btn");
    btn.id = "accent-toggle";
    btn.setAttribute("aria-label", "Choisir la couleur d'accent");
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = '<span class="accent-dot"></span>';

    var pop = el("div", "accent-pop");
    pop.id = "accent-pop";
    pop.hidden = true;
    var cur = saved || "cyan";
    ACCENTS.forEach(function (a) {
      var sw = el("button", "accent-sw" + (a.id === cur ? " is-active" : ""));
      sw.type = "button";
      sw.dataset.accent = a.id;
      sw.style.background = a.color;
      sw.title = a.label;
      sw.setAttribute("aria-label", a.label);
      sw.addEventListener("click", function () { applyAccent(a.id); closePop(); });
      pop.appendChild(sw);
    });

    function openPop() { pop.hidden = false; btn.setAttribute("aria-expanded", "true"); }
    function closePop() { pop.hidden = true; btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (pop.hidden) openPop(); else closePop();
    });
    document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) closePop(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !pop.hidden) { closePop(); btn.focus(); } });

    wrap.appendChild(btn);
    wrap.appendChild(pop);
    header.insertBefore(wrap, themeBtn);
  }

  /* ---------- Liens rapides en tête de sidebar ---------- */
  function buildSidebarLinks() {
    var nav = document.getElementById("sidebar-nav");
    if (!nav || nav.previousElementSibling && nav.previousElementSibling.classList.contains("sidebar-links")) return;
    var links = [
      { href: "index.html", label: "Accueil", svg: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>' },
      { href: "progression.html", label: "Ma progression", svg: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>' },
      { href: "projet.html", label: "Projet fil rouge", svg: '<path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/>' },
      { href: "revision.html", label: "Réviser (flashcards)", svg: '<rect x="3" y="5" width="14" height="16" rx="2"/><path d="M7 5V3h12a2 2 0 0 1 2 2v13"/>' },
      { href: "donnees-perso.html", label: "Mes données", svg: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>' },
      { href: "glossaire.html", label: "Glossaire", svg: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' }
    ];
    var box = el("div", "sidebar-links");
    links.forEach(function (lk) {
      var a = el("a", "sidebar-link");
      a.href = ROOT + lk.href;
      a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + lk.svg + '</svg><span>' + lk.label + '</span>';
      box.appendChild(a);
    });
    nav.parentNode.insertBefore(box, nav);
  }

  /* ---------- Sidebar ---------- */
  function buildSidebar() {
    var host = document.getElementById("sidebar-nav");
    if (!host || !DATA) return;
    host.innerHTML = "";

    DATA.pistes.forEach(function (piste) {
      var details = el("details", "nav-piste");
      details.style.setProperty("--piste-c", piste.couleur);
      var isCurrentPiste = CUR && piste.lecons.some(function (l) { return l.id === CUR; });
      if (isCurrentPiste) details.open = true;

      var summary = el("summary");
      summary.innerHTML =
        '<span class="dot"></span>' +
        '<span class="piste-name">' + piste.titre + '</span>' +
        '<span class="piste-pct" data-piste="' + piste.id + '">0%</span>' +
        '<span class="chev">' + ICONS.chevron + '</span>';
      details.appendChild(summary);

      var ul = el("ul", "nav-lessons");
      piste.lecons.forEach(function (l) {
        var li = el("li");
        var a = el("a");
        a.href = ROOT + piste.dossier + l.fichier;
        a.dataset.lesson = l.id;
        if (l.id === CUR) a.className = "active";
        a.innerHTML =
          '<span class="lesson-check">' + ICONS.check + '</span>' +
          '<span class="l-title">' + l.titre + '</span>';
        li.appendChild(a);
        ul.appendChild(li);
      });
      details.appendChild(ul);
      host.appendChild(details);
    });
    refreshSidebarProgress();
  }

  function refreshSidebarProgress() {
    if (!window.Progress || !DATA) return;
    DATA.pistes.forEach(function (piste) {
      var done = 0;
      piste.lecons.forEach(function (l) {
        var a = document.querySelector('#sidebar-nav a[data-lesson="' + l.id + '"]');
        var isDone = window.Progress.isDone(l.id);
        if (a) a.classList.toggle("done", isDone);
        if (isDone) done++;
      });
      var pct = piste.lecons.length ? Math.round(done / piste.lecons.length * 100) : 0;
      var lbl = document.querySelector('.piste-pct[data-piste="' + piste.id + '"]');
      if (lbl) lbl.textContent = pct + "%";
    });
    // Progression globale
    var total = DATA.totalLecons, all = 0;
    DATA.flat.forEach(function (l) { if (window.Progress.isDone(l.id)) all++; });
    var gpct = total ? Math.round(all / total * 100) : 0;
    var fill = document.getElementById("global-fill");
    var num = document.getElementById("global-num");
    if (fill) fill.style.width = gpct + "%";
    if (num) num.textContent = all + " / " + total;
  }
  window.refreshSidebarProgress = refreshSidebarProgress;

  /* ---------- Navigation préc/suiv (pages de leçon) ---------- */
  function buildLessonNav() {
    var host = document.getElementById("lesson-nav");
    if (!host || !CUR || !DATA) return;
    var flat = DATA.flat, idx = -1;
    for (var i = 0; i < flat.length; i++) if (flat[i].id === CUR) { idx = i; break; }
    if (idx < 0) return;
    var prev = idx > 0 ? flat[idx - 1] : null;
    var next = idx < flat.length - 1 ? flat[idx + 1] : null;

    var html = "";
    if (prev) {
      html += '<a class="prev" href="' + ROOT + prev.href + '">' +
        '<span class="ln-label">' + ICONS.arrowL + ' Précédent</span>' +
        '<span class="ln-title">' + prev.titre + '</span></a>';
    } else {
      html += '<a class="prev disabled" aria-disabled="true"><span class="ln-label">' + ICONS.arrowL + ' Précédent</span><span class="ln-title">Début du parcours</span></a>';
    }
    if (next) {
      html += '<a class="next" href="' + ROOT + next.href + '">' +
        '<span class="ln-label">Suivant ' + ICONS.arrowR + '</span>' +
        '<span class="ln-title">' + next.titre + '</span></a>';
    } else {
      html += '<a class="next disabled" aria-disabled="true"><span class="ln-label">Suivant ' + ICONS.arrowR + '</span><span class="ln-title">Fin du parcours</span></a>';
    }
    host.innerHTML = html;
  }

  /* ---------- Sommaire (TOC) + scrollspy ---------- */
  function buildTOC() {
    var toc = document.getElementById("toc-list");
    var prose = document.querySelector(".prose");
    if (!toc || !prose) return;
    var heads = prose.querySelectorAll("h2, h3");
    if (!heads.length) { var w = document.getElementById("toc"); if (w) w.style.display = "none"; return; }
    var items = [];
    heads.forEach(function (h, i) {
      if (!h.id) h.id = "sec-" + i + "-" + (h.textContent || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40);
      var li = el("li", h.tagName === "H3" ? "toc-h3" : "toc-h2");
      var a = el("a", null, h.textContent);
      a.href = "#" + h.id;
      li.appendChild(a);
      toc.appendChild(li);
      items.push({ id: h.id, link: a, el: h });
    });

    // Scrollspy
    var ticking = false;
    function spy() {
      ticking = false;
      var pos = window.scrollY + 120, current = items[0];
      for (var i = 0; i < items.length; i++) {
        if (items[i].el.offsetTop <= pos) current = items[i];
      }
      items.forEach(function (it) { it.link.classList.toggle("active", it === current); });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(spy); ticking = true; }
    }, { passive: true });
    spy();
  }

  /* ---------- "Leçon terminée" ---------- */
  function initDoneCheckbox() {
    var cb = document.getElementById("lesson-done-cb");
    if (!cb || !CUR || !window.Progress) return;
    cb.checked = window.Progress.isDone(CUR);
    cb.addEventListener("change", function () {
      window.Progress.set(CUR, cb.checked);
      if (cb.checked && window.Progress.logActivity) window.Progress.logActivity();
      refreshSidebarProgress();
    });
  }

  /* ---------- Menu mobile ---------- */
  function initMobileMenu() {
    var btn = document.getElementById("menu-toggle");
    var side = document.getElementById("sidebar");
    var back = document.getElementById("backdrop");
    if (!btn || !side) return;
    btn.setAttribute("aria-controls", "sidebar");
    btn.setAttribute("aria-expanded", "false");
    function setOpen(open) {
      side.classList.toggle("open", open);
      if (back) back.classList.toggle("show", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    function close() { setOpen(false); }
    btn.addEventListener("click", function () { setOpen(!side.classList.contains("open")); });
    if (back) back.addEventListener("click", close);
    side.addEventListener("click", function (e) { if (e.target.tagName === "A") close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && side.classList.contains("open")) { close(); btn.focus(); }
    });
  }

  /* ---------- Raccourci recherche ---------- */
  function initSearchShortcut() {
    document.addEventListener("keydown", function (e) {
      if ((e.key === "/" || (e.key === "k" && (e.ctrlKey || e.metaKey))) &&
          !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
        e.preventDefault();
        if (window.Search) window.Search.open();
      }
    });
    var trigger = document.getElementById("search-trigger");
    if (trigger) trigger.addEventListener("click", function () { if (window.Search) window.Search.open(); });
  }

  /* ---------- Dock d'outils (flottant, bas-droite) ---------- */
  function ensureDock() {
    var dock = document.getElementById("tools-dock");
    if (!dock) {
      dock = el("div", "tools-dock");
      dock.id = "tools-dock";
      document.body.appendChild(dock);
    }
    return dock;
  }

  /* ---------- Pomodoro (minuteur d'étude, persistant entre pages) ---------- */
  function initPomodoro() {
    var SKEY = "ag-pomo-state", CKEY = "ag-pomodoro";
    var DEF = { mode: "focus", running: false, endTime: 0, remaining: 25 * 60000, focusMin: 25, breakMin: 5 };
    function load() { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(SKEY)) || {}); } catch (e) { return Object.assign({}, DEF); } }
    function save(s) { try { localStorage.setItem(SKEY, JSON.stringify(s)); } catch (e) {} }
    function logSession() {
      try {
        var c = JSON.parse(localStorage.getItem(CKEY)) || {};
        var d = new Date(), k = d.getFullYear() + "-" + (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1) + "-" + (d.getDate() < 10 ? "0" : "") + d.getDate();
        c[k] = (c[k] || 0) + 1;
        localStorage.setItem(CKEY, JSON.stringify(c));
      } catch (e) {}
    }
    function todayCount() {
      try {
        var c = JSON.parse(localStorage.getItem(CKEY)) || {};
        var d = new Date(), k = d.getFullYear() + "-" + (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1) + "-" + (d.getDate() < 10 ? "0" : "") + d.getDate();
        return c[k] || 0;
      } catch (e) { return 0; }
    }

    var s = load();
    var dock = ensureDock();
    var wrap = el("div", "tool-item");
    var btn = el("button", "tool-btn");
    btn.id = "pomo-btn";
    btn.setAttribute("aria-label", "Minuteur Pomodoro");
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/></svg><span class="tool-badge" id="pomo-badge" hidden></span>';
    var panel = el("div", "tool-panel pomo-panel");
    panel.hidden = true;
    panel.innerHTML =
      '<div class="tp-head"><b>Minuteur d’étude</b><button class="tp-close" aria-label="Fermer">&times;</button></div>' +
      '<div class="pomo-mode"><button data-mode="focus" class="pomo-tab">Focus 25</button><button data-mode="break" class="pomo-tab">Pause 5</button></div>' +
      '<div class="pomo-time" id="pomo-time">25:00</div>' +
      '<div class="pomo-actions"><button class="btn btn-primary btn-sm" id="pomo-start">Démarrer</button><button class="btn btn-ghost btn-sm" id="pomo-reset">Réinitialiser</button></div>' +
      '<p class="pomo-sub">Sessions de focus aujourd’hui : <b id="pomo-count">0</b></p>';
    wrap.appendChild(panel);
    wrap.appendChild(btn);
    dock.appendChild(wrap);

    var timeEl = panel.querySelector("#pomo-time");
    var startBtn = panel.querySelector("#pomo-start");
    var countEl = panel.querySelector("#pomo-count");
    var badge = btn.querySelector("#pomo-badge");
    var tabs = panel.querySelectorAll(".pomo-tab");
    var tick = null;

    function durMs() { return (s.mode === "focus" ? s.focusMin : s.breakMin) * 60000; }
    function remainingMs() { return s.running ? Math.max(0, s.endTime - Date.now()) : s.remaining; }
    function fmt(ms) {
      var t = Math.ceil(ms / 1000), m = Math.floor(t / 60), sec = t % 60;
      return (m < 10 ? "0" : "") + m + ":" + (sec < 10 ? "0" : "") + sec;
    }
    function paint() {
      var ms = remainingMs();
      timeEl.textContent = fmt(ms);
      startBtn.textContent = s.running ? "Pause" : "Démarrer";
      countEl.textContent = todayCount();
      tabs.forEach(function (t) { t.classList.toggle("is-active", t.dataset.mode === s.mode); });
      panel.classList.toggle("is-break", s.mode === "break");
      if (s.running) { badge.textContent = fmt(ms); badge.hidden = false; }
      else badge.hidden = true;
    }
    function stopTick() { if (tick) { clearInterval(tick); tick = null; } }
    function startTick() {
      stopTick();
      tick = setInterval(function () {
        if (remainingMs() <= 0) {
          stopTick();
          s.running = false; s.remaining = durMs();
          if (s.mode === "focus") { logSession(); s.mode = "break"; s.remaining = s.breakMin * 60000; }
          else { s.mode = "focus"; s.remaining = s.focusMin * 60000; }
          save(s); paint();
          try { document.title = "⏰ Terminé — " + document.title.replace(/^⏰ Terminé — /, ""); } catch (e) {}
        } else paint();
      }, 1000);
    }
    function setMode(m) {
      if (s.running) return;
      s.mode = m; s.remaining = durMs(); save(s); paint();
    }

    startBtn.addEventListener("click", function () {
      if (s.running) { s.remaining = remainingMs(); s.running = false; stopTick(); }
      else { s.endTime = Date.now() + remainingMs(); s.running = true; startTick(); }
      save(s); paint();
    });
    panel.querySelector("#pomo-reset").addEventListener("click", function () {
      s.running = false; s.remaining = durMs(); stopTick(); save(s); paint();
    });
    tabs.forEach(function (t) { t.addEventListener("click", function () { setMode(t.dataset.mode); }); });
    panel.querySelector(".tp-close").addEventListener("click", function () { panel.hidden = true; });
    btn.addEventListener("click", function () {
      // ferme les autres panneaux du dock
      dock.querySelectorAll(".tool-panel").forEach(function (p) { if (p !== panel) p.hidden = true; });
      panel.hidden = !panel.hidden;
    });

    // Reprend l'état au chargement
    if (s.running && remainingMs() > 0) startTick();
    else if (s.running) { s.running = false; s.remaining = durMs(); save(s); }
    paint();
  }

  /* ---------- Notes & surlignages (pages de leçon) ---------- */
  function initLessonTools() {
    if (!CUR) return;
    var prose = document.querySelector(".prose");

    /* --- Notes --- */
    var NKEY = "ag-notes";
    function loadNotes() { try { return JSON.parse(localStorage.getItem(NKEY)) || {}; } catch (e) { return {}; } }
    function saveNote(txt) {
      var all = loadNotes();
      if (txt && txt.trim()) all[CUR] = txt; else delete all[CUR];
      try { localStorage.setItem(NKEY, JSON.stringify(all)); } catch (e) {}
    }
    var dock = ensureDock();
    var item = el("div", "tool-item");
    var nbtn = el("button", "tool-btn");
    nbtn.setAttribute("aria-label", "Mes notes sur cette leçon");
    nbtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg><span class="tool-badge" id="notes-dot" hidden>•</span>';
    var npanel = el("div", "tool-panel notes-panel");
    npanel.hidden = true;
    npanel.innerHTML =
      '<div class="tp-head"><b>Notes — cette leçon</b><button class="tp-close" aria-label="Fermer">&times;</button></div>' +
      '<textarea class="notes-area" placeholder="Tes notes personnelles sur cette leçon… (enregistrées dans ce navigateur)"></textarea>' +
      '<p class="notes-status" id="notes-status">Enregistrement automatique</p>';
    item.appendChild(npanel);
    item.appendChild(nbtn);
    dock.appendChild(item);

    var area = npanel.querySelector(".notes-area");
    var status = npanel.querySelector("#notes-status");
    var dot = nbtn.querySelector("#notes-dot");
    area.value = loadNotes()[CUR] || "";
    dot.hidden = !area.value;
    var tmr = null;
    area.addEventListener("input", function () {
      status.textContent = "Enregistrement…";
      clearTimeout(tmr);
      tmr = setTimeout(function () {
        saveNote(area.value);
        dot.hidden = !area.value.trim();
        status.textContent = "Enregistré ✓";
      }, 400);
    });
    nbtn.addEventListener("click", function () {
      dock.querySelectorAll(".tool-panel").forEach(function (p) { if (p !== npanel) p.hidden = true; });
      npanel.hidden = !npanel.hidden;
      if (!npanel.hidden) area.focus();
    });
    npanel.querySelector(".tp-close").addEventListener("click", function () { npanel.hidden = true; });

    /* --- Surlignages --- */
    if (!prose) return;
    var HKEY = "ag-hl";
    function loadHl() { try { return JSON.parse(localStorage.getItem(HKEY)) || {}; } catch (e) { return {}; } }
    function saveHl(list) {
      var all = loadHl();
      if (list && list.length) all[CUR] = list; else delete all[CUR];
      try { localStorage.setItem(HKEY, JSON.stringify(all)); } catch (e) {}
    }
    function currentList() { return (loadHl()[CUR] || []).slice(); }

    // Enveloppe une range dans un <mark> (échoue proprement si multi-éléments).
    function wrapRange(range) {
      try { var m = document.createElement("mark"); m.className = "ag-hl"; range.surroundContents(m); return m; } catch (e) { return null; }
    }
    function bindRemove(m) {
      m.title = "Cliquer pour retirer le surlignage";
      m.addEventListener("click", function () {
        var txt = m.textContent;
        var parent = m.parentNode;
        while (m.firstChild) parent.insertBefore(m.firstChild, m);
        parent.removeChild(m);
        parent.normalize();
        var list = currentList(), i = list.indexOf(txt);
        if (i !== -1) { list.splice(i, 1); saveHl(list); }
      });
    }
    // Ré-applique un texte stocké : 1re occurrence dans un nœud texte de .prose.
    function applyStored(text) {
      var walk = document.createTreeWalker(prose, NodeFilter.SHOW_TEXT, null);
      var node;
      while ((node = walk.nextNode())) {
        if (node.parentNode && node.parentNode.classList && node.parentNode.classList.contains("ag-hl")) continue;
        var idx = node.nodeValue.indexOf(text);
        if (idx !== -1) {
          var r = document.createRange();
          r.setStart(node, idx); r.setEnd(node, idx + text.length);
          var m = wrapRange(r);
          if (m) { bindRemove(m); return true; }
        }
      }
      return false;
    }
    // Restaure les surlignages enregistrés.
    var stored = currentList(), kept = [];
    stored.forEach(function (t) { if (applyStored(t)) kept.push(t); });
    if (kept.length !== stored.length) saveHl(kept);

    // Bouton flottant « Surligner » sur sélection.
    var hlBtn = el("button", "hl-float");
    hlBtn.type = "button";
    hlBtn.textContent = "Surligner";
    hlBtn.hidden = true;
    document.body.appendChild(hlBtn);
    function hideHl() { hlBtn.hidden = true; }
    prose.addEventListener("mouseup", function () {
      setTimeout(function () {
        var sel = window.getSelection();
        if (!sel || sel.isCollapsed) { hideHl(); return; }
        var txt = sel.toString();
        if (!txt.trim() || txt.length > 300) { hideHl(); return; }
        var anc = sel.anchorNode;
        if (!anc || !prose.contains(anc)) { hideHl(); return; }
        if (anc.parentNode && anc.parentNode.closest && anc.parentNode.closest(".ag-hl")) { hideHl(); return; }
        var rect = sel.getRangeAt(0).getBoundingClientRect();
        hlBtn.style.top = (window.scrollY + rect.top - 38) + "px";
        hlBtn.style.left = (window.scrollX + rect.left + rect.width / 2) + "px";
        hlBtn.hidden = false;
      }, 0);
    });
    hlBtn.addEventListener("mousedown", function (e) { e.preventDefault(); });
    hlBtn.addEventListener("click", function () {
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed) { hideHl(); return; }
      var txt = sel.toString();
      var m = wrapRange(sel.getRangeAt(0));
      if (m) { bindRemove(m); var list = currentList(); list.push(txt); saveHl(list); }
      sel.removeAllRanges();
      hideHl();
    });
    document.addEventListener("mousedown", function (e) { if (e.target !== hlBtn) hideHl(); });
    window.addEventListener("scroll", hideHl, { passive: true });
  }

  /* ---------- Init ---------- */
  function init() {
    initTheme();
    initAccent();
    buildSidebarLinks();
    buildSidebar();
    buildLessonNav();
    buildTOC();
    initDoneCheckbox();
    initMobileMenu();
    initSearchShortcut();
    initPomodoro();
    initLessonTools();
    // Engagement : enregistre la visite de la leçon (activité du jour + « Reprendre »).
    if (CUR && window.Progress && window.Progress.touch) window.Progress.touch(CUR);
    window.addEventListener("storage", function (e) { if (e.key === "ag-progress") refreshSidebarProgress(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
