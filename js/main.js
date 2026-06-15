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

  /* ---------- Init ---------- */
  function init() {
    initTheme();
    buildSidebar();
    buildLessonNav();
    buildTOC();
    initDoneCheckbox();
    initMobileMenu();
    initSearchShortcut();
    window.addEventListener("storage", function (e) { if (e.key === "ag-progress") refreshSidebarProgress(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
