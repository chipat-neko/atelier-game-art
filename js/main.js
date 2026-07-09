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

  /* ---------- Projet fil rouge (source unique, partagée avec projet.html) ----------
     `action` = consigne courte affichée dans le bandeau de leçon. */
  var FILROUGE_STEPS = [
    { ico: "📐", title: "Cadrer & modéliser",
      desc: "Pars d'un blockout (formes simples) pour valider proportions et silhouette, puis modélise proprement ton prop.",
      action: "Choisis ton prop fil rouge (caisse, épée, lampe…) et fais-en un blockout aux bonnes proportions.",
      lessons: ["f05", "f04", "b03", "b04"] },
    { ico: "🗺️", title: "Déplier les UV",
      desc: "Mets la surface à plat pour pouvoir la texturer sans déformation. Place tes coutures avec soin.",
      action: "Déplie les UV de ton prop (coutures discrètes) pour préparer le texturing.",
      lessons: ["f06", "b06"] },
    { ico: "🪨", title: "Détails (option) : sculpt & retopo",
      desc: "Pour plus de relief : sculpte un high-poly, puis reconstruis une topologie propre (retopologie).",
      action: "Optionnel : sculpte du relief sur ton prop, puis retopologie une version propre.",
      lessons: ["b05", "l04"] },
    { ico: "🎨", title: "Texturer en PBR",
      desc: "Crée tes maps : albedo, normal, roughness, metallic, AO. Comprends d'abord la logique PBR, puis peins.",
      action: "Crée les maps PBR de ton prop (albedo, normal, roughness, metallic, AO).",
      files: '<div class="fr-files"><a class="fr-files-thumb" href="assets/exos/caisse/ref_low.png" target="_blank" rel="noopener"><img src="assets/exos/caisse/ref_low.png" alt="Caisse d\'exercice fournie"></a><div class="fr-files-txt"><p><b>Pas encore de prop&nbsp;?</b> Utilise la <b>caisse en bois</b> fournie&nbsp;: low-poly dépliée + high-poly à baker + rendus de référence.</p><span class="fr-files-links"><a href="assets/exos/caisse/caisse_low.fbx" download>.fbx</a><a href="assets/exos/caisse/caisse_low.glb" download>.glb</a><a href="assets/exos/caisse/caisse_low.blend" download>low.blend</a><a href="assets/exos/caisse/caisse_high.blend" download>high.blend</a><a href="assets/exos/caisse/README.md" download>README</a></span></div></div>',
      lessons: ["f07", "f08", "l02", "b08", "sh09"] },
    { ico: "📦", title: "Exporter pour le moteur",
      desc: "Choisis le bon format (FBX / glTF), vérifie l'échelle et les normales, puis exporte.",
      action: "Exporte ton prop (FBX/glTF) : vérifie l'échelle et l'orientation des normales.",
      lessons: ["f03", "b11", "c02"] },
    { ico: "🧩", title: "Importer & créer le matériau",
      desc: "Importe ton asset dans le moteur de ton choix et branche tes textures dans un matériau.",
      action: "Importe ton prop dans ton moteur et branche tes textures dans un matériau.",
      engines: { unity: ["u05", "u06"], unreal: ["e04", "e05"], godot: ["g05", "g06"] } },
    { ico: "💡", title: "Éclairer la scène",
      desc: "Pose une lumière directionnelle (soleil) et soigne l'ambiance pour mettre ton asset en valeur.",
      action: "Pose une lumière et soigne l'ambiance autour de ton prop.",
      engines: { unity: ["u07"], unreal: ["e06"], godot: ["g07"] } },
    { ico: "🕹️", title: "Donner vie : script",
      desc: "Fais bouger/réagir ton objet avec du code (rotation, ramassage, interaction) — ou en Blueprints.",
      action: "Fais réagir ton prop (rotation, ramassage, interaction) par script ou Blueprints.",
      engines: { unity: ["cs07", "cs12"], unreal: ["bp05", "bp11"], godot: ["gd07", "gd12"] } },
    { ico: "✨", title: "VFX & finitions (option)",
      desc: "Ajoute un effet (particules, halo, shader) pour donner du caractère à ta scène.",
      action: "Optionnel : ajoute un effet (particules, halo, shader) pour le caractère.",
      engines: { unity: ["u09"], unreal: ["e08"], godot: ["g09"] } },
    { ico: "⚙️", title: "Optimiser & livrer",
      desc: "Vérifie le coût (draw calls, LOD), nettoie, et exporte un build propre.",
      action: "Vérifie le coût (draw calls, LOD), nettoie et exporte un build propre.",
      lessons: ["f12"], engines: { unity: ["u11"], unreal: ["e10"], godot: ["g11"] } }
  ];
  var FR_INDEX = (function () {
    var idx = {}, all = {};
    FILROUGE_STEPS.forEach(function (s, i) {
      function add(ids) { (ids || []).forEach(function (id) { all[id] = 1; if (!idx[id]) idx[id] = { n: i + 1, title: s.title, ico: s.ico, action: s.action }; }); }
      add(s.lessons);
      if (s.engines) Object.keys(s.engines).forEach(function (k) { add(s.engines[k]); });
    });
    return { idx: idx, all: Object.keys(all) };
  })();
  window.FILROUGE = { steps: FILROUGE_STEPS, lessonStep: FR_INDEX.idx, allIds: FR_INDEX.all };

  function initFilRouge() {
    if (!CUR) return;
    var step = FR_INDEX.idx[CUR];
    if (!step) return; // bandeau discret affiché UNIQUEMENT sur les leçons liées à une étape
    var prose = document.querySelector(".prose");
    if (!prose) return;
    var banner = el("a", "filrouge-banner");
    banner.href = ROOT + "projet.html";
    banner.innerHTML =
      '<span class="frb-ico">🧵</span>' +
      '<span class="frb-body">' +
        '<span class="frb-title">Projet fil rouge · Étape ' + step.n + ' / ' + FILROUGE_STEPS.length + '</span>' +
        '<span class="frb-action">' + step.action + '</span>' +
      '</span>' +
      '<span class="frb-go"><span>Projet</span> ' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>';
    // En HAUT de la leçon : juste après le callout d'objectifs s'il existe.
    var obj = prose.querySelector(".callout.objectif");
    if (obj) { if (obj.nextSibling) prose.insertBefore(banner, obj.nextSibling); else prose.appendChild(banner); }
    else prose.insertBefore(banner, prose.firstChild);
  }

  /* ---------- Repère dans la piste (compteur leçon X/N + mini-barre) ---------- */
  function initLessonStepper() {
    if (!CUR || !DATA) return;
    var head = document.querySelector(".lesson-head");
    if (!head) return;
    var piste = null, idx = -1;
    for (var i = 0; i < DATA.pistes.length && !piste; i++) {
      var p = DATA.pistes[i];
      for (var j = 0; j < p.lecons.length; j++) {
        if (p.lecons[j].id === CUR) { piste = p; idx = j; break; }
      }
    }
    if (!piste || idx < 0) return;
    var total = piste.lecons.length, pos = idx + 1, done = 0;
    if (window.Progress) piste.lecons.forEach(function (l) { if (window.Progress.isDone(l.id)) done++; });
    var pct = total ? Math.round(done / total * 100) : 0;
    var box = el("div", "lesson-stepper");
    box.style.setProperty("--c", piste.couleur);
    box.innerHTML =
      '<div class="ls-row">' +
        '<span class="ls-pos">Leçon ' + pos + ' / ' + total + '</span>' +
        '<span class="ls-piste">' + piste.titre + '</span>' +
        '<span class="ls-done">' + done + ' / ' + total + ' terminée' + (done > 1 ? 's' : '') + '</span>' +
      '</div>' +
      '<div class="ls-bar"><i style="width:' + pct + '%"></i></div>';
    var meta = head.querySelector(".lesson-meta");
    if (meta && meta.nextSibling) head.insertBefore(box, meta.nextSibling);
    else head.appendChild(box);
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

  /* ---------- Journal des nouveautés (cloche) ----------
     À chaque évolution du site, ajoute une entrée EN TÊTE (id le plus grand). */
  var CHANGELOG = [
    { id: 22, date: "9 juillet 2026", title: "Guides d'interface Blender &amp; Godot harmonisés", items: [
      "Le <b>Guide de l'interface Blender</b> gagne les mêmes éléments de fin que celui de Godot&nbsp;: une <b>checklist «&nbsp;Critères de réussite&nbsp;»</b> auto-évaluée (cochable, sauvegardée) et une section <b>«&nbsp;Pour aller plus loin&nbsp;»</b> avec renvois croisés.",
      "Les deux guides de référence ont désormais la <b>même structure de bout en bout</b>."
    ] },
    { id: 21, date: "9 juillet 2026", title: "Nouveau : Guide complet de l'interface Godot", items: [
      "<b>Une leçon de référence (G2+)</b> après «&nbsp;Anatomie de l'éditeur&nbsp;»&nbsp;: chaque <b>menu</b> de Godot (Scene, Project, Debug, Editor, Help) capturé et <b>détaillé entrée par entrée</b> dans un tableau, plus les onglets, la barre d'outils 3D, les docks et les panneaux du bas.",
      "<b>Comme le guide Blender</b> — même principe «&nbsp;la totalité du logiciel&nbsp;» pour ne plus avoir à chercher ailleurs à quoi sert un bouton. Toutes les captures sont cliquables pour agrandir.",
      "Le programme passe à <b>154 leçons</b>."
    ] },
    { id: 20, date: "9 juillet 2026", title: "Piste Godot illustrée de bout en bout", items: [
      "<b>Six leçons Godot de plus en vraies captures annotées</b>&nbsp;: <b>G4</b> (le dock FileSystem et res://), <b>G5</b> (l'import d'un glTF avec le dock Import), <b>G6</b> (le StandardMaterial3D et ses canaux PBR), <b>G7</b> (une DirectionalLight3D et ses ombres), <b>G8</b> (le node WorldEnvironment) et <b>G9</b> (un GPUParticles3D).",
      "<b>Même caisse, même moteur</b> — toutes les captures partagent la scène de démo (la caisse de l'exercice), pour un fil cohérent&nbsp;; images cliquables pour agrandir.",
      "<b>100% local</b> — éditeur Godot 4.7 capturé hors-ligne&nbsp;; les leçons plus conceptuelles (installation, renderers, plugins, optimisation) gardent leurs schémas, plus clairs qu'une capture."
    ] },
    { id: 19, date: "8 juillet 2026", title: "Godot aussi en vraies captures (éditeur)", items: [
      "<b>Piste Godot lancée en images</b> — la leçon «&nbsp;L'éditeur&nbsp;» (G2) montre maintenant une <b>vraie capture annotée</b> de l'éditeur Godot 4.7&nbsp;: l'arbre de nodes, le viewport, le FileSystem et l'Inspector.",
      "<b>Sans logiciel payant</b> — Godot étant libre, tout est généré ici, hors-ligne&nbsp;; les autres leçons Godot suivront sur le même modèle."
    ] },
    { id: 18, date: "8 juillet 2026", title: "Fondamentaux illustrés en vrai (UV &amp; baking)", items: [
      "<b>F6 (UV)</b> et <b>F8 (baking)</b> gagnent une <b>vraie capture Blender</b> en complément de leur schéma&nbsp;: le damier sur un modèle déplié pour l'UV, et la paire high-poly / low-poly pour le bake.",
      "<b>Théorie + réalité</b> — les schémas conceptuels restent, la capture montre à quoi ça ressemble dans le logiciel (cliquable pour agrandir)."
    ] },
    { id: 17, date: "8 juillet 2026", title: "Guide de l'interface — panneau Properties &amp; éditeurs", items: [
      "<b>Properties, onglet par onglet</b> — le guide Blender détaille désormais les 13 onglets du panneau Properties (Render, Object, Modifiers, Physics, Material…) avec capture annotée.",
      "<b>Les principaux éditeurs</b> — un tableau des éditeurs (Shader, UV, Geometry Nodes, Compositor, Timeline…) et comment changer le type d'une zone, avec deux exemples en capture."
    ] },
    { id: 16, date: "8 juillet 2026", title: "« Ton itinéraire » — par où commencer selon ton objectif", items: [
      "<b>4 parcours par profil</b> — dans «&nbsp;À propos&nbsp;»&nbsp;: artiste débutant, «&nbsp;juste des assets 3D&nbsp;», futur dev gameplay, ou pressé/projet précis, chacun avec l'ordre des pistes à suivre.",
      "<b>Mini-quiz d'orientation</b> — 3 questions et le site te surligne le parcours conseillé.",
      "<b>Accès direct</b> — un bouton «&nbsp;Trouver mon parcours&nbsp;» sur la page d'accueil."
    ] },
    { id: 15, date: "8 juillet 2026", title: "Nouvelle leçon — Guide complet de l'interface Blender", items: [
      "<b>Une leçon-référence</b> insérée juste après «&nbsp;Installation&nbsp;»&nbsp;: chaque menu de Blender est ouvert en capture et <b>chaque item est expliqué dans un tableau</b> — File, Edit, Render, Window, Help, puis View, Select, Add, Object, et l'Edit Mode (Mesh, Vertex, Edge, Face).",
      "<b>Pour ne plus chercher ailleurs</b> — l'idée&nbsp;: retrouver n'importe quelle commande et son rôle sans quitter le cours. 13 captures de menus, cliquables pour agrandir.",
      "<b>Images cliquables</b> — toutes les captures d'écran du site s'ouvrent maintenant en plein écran d'un clic (Échap pour fermer)."
    ] },
    { id: 14, date: "8 juillet 2026", title: "Toute la piste Blender illustrée en vraies captures", items: [
      "<b>11 diagrammes remplacés</b> — chaque leçon Blender (B1 à B11) troque son schéma conceptuel pour une <b>vraie capture d'écran annotée</b>&nbsp;: interface, Edit Mode, modifiers, sculpt, UV/damier, Shader Editor, bake, Geometry Nodes, Weight Paint, export.",
      "<b>Repères posés dessus</b> — cadres numérotés, flèches et légende explicative sur chaque image, pour ne plus chercher les boutons.",
      "<b>Léger &amp; hors-ligne</b> — WebP compressé (~50–100 Ko), texte alternatif détaillé, généré avec Blender 4.2 LTS."
    ] },
    { id: 13, date: "8 juillet 2026", title: "Premières captures d'écran réelles (Blender)", items: [
      "<b>On voit enfin l'écran</b> — la leçon Blender (L1) montre de <b>vraies captures</b> de l'interface&nbsp;: l'espace Layout, l'Edit Mode et sa topologie, et le Shader Editor avec son graphe de nœuds.",
      "<b>Légères &amp; hors-ligne</b> — images locales en WebP compressé (~50–75 Ko), avec texte alternatif détaillé pour l'accessibilité.",
      "<b>Prochainement</b> — d'autres captures Blender (UV, bake, export) sur le même modèle. Les autres logiciels (Unity, Substance…) suivront quand leur capture sera possible."
    ] },
    { id: 12, date: "8 juillet 2026", title: "Kit d'exercice : la caisse en bois (fichiers fournis)", items: [
      "<b>Fichiers de départ téléchargeables</b> — une caisse en bois prête à l'emploi&nbsp;: low-poly dépliée (<code>.blend</code>, <code>.fbx</code>, <code>.glb</code>), high-poly à baker, dépliage UV et rendus de référence. Plus besoin de fabriquer ton matériel avant de pratiquer.",
      "<b>Branchée là où ça compte</b> — encart «&nbsp;📦 Fichiers de l'exercice&nbsp;» dans L2 (Substance), F8 et B8 (baking), et à l'étape «&nbsp;Texturer&nbsp;» du projet fil rouge.",
      "<b>100&nbsp;% hors-ligne &amp; libre</b> — assets stockés en local (<code>assets/exos/caisse/</code>), générés par un script Blender fourni et reproductible."
    ] },
    { id: 11, date: "8 juillet 2026", title: "« Essaie maintenant » — la pratique dès la lecture", items: [
      "<b>Micro-encarts pratiques</b> — dans les leçons les plus longues (piste Logiciels et Unity), des encarts «&nbsp;🖐 Essaie maintenant&nbsp;» proposent 1 à 3 actions d'une minute, intercalées au fil du texte plutôt qu'à la seule démo finale.",
      "<b>Faisable gratuitement</b> — les actions s'appuient sur des outils gratuits (Blender, Krita/GIMP, Material Maker, Poly Haven) et ne demandent aucun fichier préalable.",
      "<b>On touche le logiciel toutes les 5 minutes</b> — 19 encarts pour l'instant (Blender, Substance, 2D, Sculpt, bibliothèques, éditeur Unity, matériaux, éclairage, post-processing)."
    ] },
    { id: 10, date: "8 juillet 2026", title: "Critères de réussite interactifs — la pratique se valide", items: [
      "<b>Checklists de pratique</b> — sur les 153 leçons, les «&nbsp;Critères de réussite&nbsp;» deviennent des cases à cocher&nbsp;: tu t'auto-évalues étape par étape, l'état est sauvegardé dans ce navigateur.",
      "<b>Lu vs pratiqué</b> — le tableau de bord distingue désormais les leçons <b>terminées</b> (lues) des leçons <b>pratiquées</b> (tous les critères validés), avec un décompte par parcours.",
      "<b>100&nbsp;% hors-ligne &amp; accessible</b> — amélioration progressive&nbsp;: sans JavaScript, la liste des critères reste lisible telle quelle&nbsp;; cases au clavier et libellés inclus."
    ] },
    { id: 9, date: "7 juillet 2026", title: "Cours : exercices alignés sur les leçons", items: [
      "<b>Audit d'alignement</b> — vérification que chaque réponse d'exercice auto-corrigé est bien enseignée dans la prose (99 leçons passées au crible).",
      "<b>21 notions ajoutées</b> là où un exercice attendait un terme jamais expliqué : collisions/triggers &amp; <code>ref</code>/<code>Func</code>/<code>sealed</code> en C#, <code>SetActorLocation</code>/<code>FVector</code> en C++, <code>texel</code>/AO/<code>length</code> en shaders, extension <code>.gd</code>, GDExtension, <code>getmetatable</code>, Blender Foundation, World Partition…"
    ] },
    { id: 8, date: "7 juillet 2026", title: "Nouveautés, cours Logiciels & finitions", items: [
      "<b>Cloche 🔔</b> — notifications cliquables, détail en fenêtre centrale, et une page «&nbsp;Nouveautés&nbsp;» dédiée.",
      "<b>Cours Logiciels</b> approfondis : rendu Blender, masques & bake Substance, sprite sheet 2D, brosses de sculpt, licences d'assets.",
      "<b>Exercices</b> — les réponses symboliques acceptent aussi leur nom écrit («&nbsp;point-virgule&nbsp;» = «&nbsp;;&nbsp;»)."
    ] },
    { id: 7, date: "25 juin 2026", title: "Fond neutre & accessibilité", items: [
      "<b>Fond neutre</b> — retrait du fond «&nbsp;espresso&nbsp;» en thème clair comme sombre.",
      "<b>Accessibilité</b> — lien d'évitement, focus clavier net, régions live, Échap sur les panneaux."
    ] },
    { id: 6, date: "24 juin 2026", title: "Projet fil rouge & repère de leçon", items: [
      "<b>Projet transversal</b> — un fil rouge relie toutes les pistes, du blockout au moteur, avec des consignes dans les leçons clés.",
      "<b>Repère de leçon</b> — compteur «&nbsp;Leçon X / N&nbsp;» + mini-barre d'avancement de la piste."
    ] },
    { id: 5, date: "23 juin 2026", title: "Habillage Atelier/Studio & palette d'accent", items: [
      "<b>Nouvel habillage</b> — thème «&nbsp;Atelier / Studio&nbsp;» avec polices locales (100&nbsp;% hors-ligne).",
      "<b>Palette d'accent</b> — 6 couleurs au choix, en thème clair et sombre.",
      "<b>Finitions visuelles</b> — dock mobile, cibles tactiles, barre de code lisible."
    ] },
    { id: 4, date: "23 juin 2026", title: "Motivation & justesse des exercices", items: [
      "<b>Motivation</b> — badges, filtre flashcards «&nbsp;mes leçons terminées&nbsp;», série liée aux actions.",
      "<b>Correction plus juste</b> — QCM avec seconde chance ; «&nbsp;trois&nbsp;» accepté pour «&nbsp;3&nbsp;»."
    ] },
    { id: 3, date: "18 juin 2026", title: "Tableau de bord, révision & outils", items: [
      "<b>Progression</b> — page dédiée (heatmap, séries, scores) et <b>flashcards</b> du glossaire.",
      "<b>Outils</b> — Pomodoro, Notes, surlignages, «&nbsp;Mes données&nbsp;» (export/import)."
    ] },
    { id: 2, date: "18 juin 2026", title: "Exercices auto-corrigés", items: [
      "<b>Exercice express</b> — un exercice auto-corrigé sur chaque leçon (jusqu'à 10 par leçon de code) + QCM-bilan de fin de piste."
    ] },
    { id: 1, date: "15 juin 2026", title: "Nouvelles pistes de programmation", items: [
      "<b>Nouvelles pistes</b> — Lua, Blueprints et Shaders."
    ] }
  ];
  window.CHANGELOG = CHANGELOG; // partagé avec la page changelog.html

  function initChangelog() {
    if (!CHANGELOG.length) return;
    var header = document.querySelector(".site-header");
    var themeBtn = document.getElementById("theme-toggle");
    if (!header || !themeBtn) return;
    var SEEN = "ag-changelog-seen";
    var seen = 0; try { seen = parseInt(localStorage.getItem(SEEN), 10) || 0; } catch (e) {}
    var newest = CHANGELOG[0].id;
    var unread = CHANGELOG.filter(function (e) { return e.id > seen; }).length;

    var wrap = el("div", "cl-wrap");
    var btn = el("button", "icon-btn");
    btn.setAttribute("aria-label", "Nouveautés du site");
    btn.setAttribute("aria-haspopup", "dialog");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>' +
      (unread ? '<span class="cl-badge">' + (unread > 9 ? '9+' : unread) + '</span>' : '');

    var clRoot = window.SITE_ROOT || "";

    // Modale centrale : détail complet d'une mise à jour.
    var modal = el("div", "cl-modal");
    modal.hidden = true;
    modal.innerHTML =
      '<div class="cl-modal-backdrop"></div>' +
      '<div class="cl-modal-box" role="dialog" aria-modal="true" aria-label="Détail de la mise à jour" tabindex="-1">' +
        '<button class="cl-modal-close" aria-label="Fermer">&times;</button>' +
        '<div class="cl-modal-date"></div><h3 class="cl-modal-title"></h3><ul class="cl-modal-items"></ul>' +
        '<a class="cl-modal-all" href="' + clRoot + 'changelog.html">Voir tout le journal →</a>' +
      '</div>';
    document.body.appendChild(modal);
    function closeModal() { modal.hidden = true; }
    modal.querySelector(".cl-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".cl-modal-backdrop").addEventListener("click", closeModal);
    function openModal(entry) {
      modal.querySelector(".cl-modal-date").textContent = entry.date;
      modal.querySelector(".cl-modal-title").textContent = entry.title;
      var ul = modal.querySelector(".cl-modal-items"); ul.innerHTML = "";
      (entry.items || []).forEach(function (it) { var li = document.createElement("li"); li.innerHTML = it; ul.appendChild(li); });
      modal.hidden = false;
      modal.querySelector(".cl-modal-box").focus();
    }

    // Panneau : liste de notifications (titre + date), chacune ouvre la modale.
    var pop = el("div", "cl-pop");
    pop.hidden = true;
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", "Journal des nouveautés");
    var html = '<div class="cl-head"><b>🔔 Nouveautés</b><button class="cl-close" aria-label="Fermer">&times;</button></div><div class="cl-list">';
    CHANGELOG.forEach(function (e) {
      html += '<button type="button" class="cl-item" data-id="' + e.id + '">' +
        '<span class="cl-item-main"><span class="cl-item-title">' + e.title + '</span>' +
        '<span class="cl-item-date">' + e.date + '</span></span>' +
        (e.id > seen ? '<span class="cl-new">Nouveau</span>' : '') +
        '<svg class="cl-item-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
        '</button>';
    });
    html += '</div><div class="cl-foot"><a href="' + clRoot + 'changelog.html">Voir tout le journal →</a></div>';
    pop.innerHTML = html;
    pop.querySelectorAll(".cl-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var id = parseInt(item.getAttribute("data-id"), 10);
        var entry = CHANGELOG.filter(function (e) { return e.id === id; })[0];
        if (entry) openModal(entry);
      });
    });

    var opened = false;
    function open() { pop.hidden = false; btn.setAttribute("aria-expanded", "true"); opened = true; }
    function close() {
      pop.hidden = true; btn.setAttribute("aria-expanded", "false");
      // On ne marque « vu » qu'à la FERMETURE : le badge reste tant qu'on lit.
      if (opened) {
        opened = false;
        try { localStorage.setItem(SEEN, String(newest)); } catch (e) {}
        var b = btn.querySelector(".cl-badge"); if (b) b.parentNode.removeChild(b);
        pop.querySelectorAll(".cl-new").forEach(function (n) { n.parentNode.removeChild(n); });
      }
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); if (pop.hidden) open(); else close(); });
    pop.querySelector(".cl-close").addEventListener("click", close);
    document.addEventListener("click", function (e) { if (!wrap.contains(e.target) && modal.hidden) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!modal.hidden) closeModal();
      else if (!pop.hidden) { close(); btn.focus(); }
    });

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
        if (l.id === CUR) { a.className = "active"; a.setAttribute("aria-current", "page"); }
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
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Minuteur d'étude Pomodoro");
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
    btn.setAttribute("aria-haspopup", "dialog");
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", function () {
      // ferme les autres panneaux du dock
      dock.querySelectorAll(".tool-panel").forEach(function (p) { if (p !== panel) p.hidden = true; });
      dock.querySelectorAll(".tool-btn[aria-expanded]").forEach(function (b) { if (b !== btn) b.setAttribute("aria-expanded", "false"); });
      panel.hidden = !panel.hidden;
      btn.setAttribute("aria-expanded", panel.hidden ? "false" : "true");
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
    npanel.setAttribute("role", "dialog");
    npanel.setAttribute("aria-label", "Notes de la leçon");
    npanel.innerHTML =
      '<div class="tp-head"><b>Notes — cette leçon</b><button class="tp-close" aria-label="Fermer">&times;</button></div>' +
      '<textarea class="notes-area" aria-label="Tes notes sur cette leçon" placeholder="Tes notes personnelles sur cette leçon… (enregistrées dans ce navigateur)"></textarea>' +
      '<p class="notes-status" id="notes-status" aria-live="polite">Enregistrement automatique</p>';
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
    nbtn.setAttribute("aria-haspopup", "dialog");
    nbtn.setAttribute("aria-expanded", "false");
    nbtn.addEventListener("click", function () {
      dock.querySelectorAll(".tool-panel").forEach(function (p) { if (p !== npanel) p.hidden = true; });
      dock.querySelectorAll(".tool-btn[aria-expanded]").forEach(function (b) { if (b !== nbtn) b.setAttribute("aria-expanded", "false"); });
      npanel.hidden = !npanel.hidden;
      nbtn.setAttribute("aria-expanded", npanel.hidden ? "false" : "true");
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

  /* ---------- Accessibilité (lien d'évitement, landmarks) ---------- */
  function initA11y() {
    var main = document.querySelector(".content-wrap");
    if (main && !document.querySelector(".skip-link")) {
      if (!main.id) main.id = "contenu";
      main.setAttribute("tabindex", "-1");
      var skip = el("a", "skip-link", "Aller au contenu");
      skip.href = "#" + main.id;
      document.body.insertBefore(skip, document.body.firstChild);
    }
    var snav = document.getElementById("sidebar-nav");
    if (snav) snav.setAttribute("aria-label", "Programme du cours");
    var toc = document.getElementById("toc");
    if (toc) toc.setAttribute("aria-label", "Sommaire de la leçon");
    // Échap ferme un panneau ouvert du dock (Pomodoro/Notes) et rend le focus au bouton.
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var dock = document.getElementById("tools-dock"); if (!dock) return;
      dock.querySelectorAll(".tool-panel:not([hidden])").forEach(function (p) {
        p.hidden = true;
        var item = p.parentNode, b = item && item.querySelector(".tool-btn");
        if (b) { b.setAttribute("aria-expanded", "false"); b.focus(); }
      });
    });
  }

  /* ---------- Init ---------- */
  function init() {
    initTheme();
    initA11y();
    initChangelog();
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
    initLessonStepper();
    initFilRouge();
    // Engagement : enregistre la visite de la leçon (activité du jour + « Reprendre »).
    if (CUR && window.Progress && window.Progress.touch) window.Progress.touch(CUR);
    window.addEventListener("storage", function (e) { if (e.key === "ag-progress") refreshSidebarProgress(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();


/* =========================================================================
   Lightbox — agrandir les captures d'écran au clic. 100% local, sans dépendance.
   Cible les images des figures de capture ; Échap ou clic pour fermer.
   ========================================================================= */
(function () {
  "use strict";
  function initLightbox() {
    var imgs = document.querySelectorAll("figure.screenshot img");
    if (!imgs.length) return;

    var ov = document.createElement("div");
    ov.className = "lb-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Image agrandie");
    ov.innerHTML =
      '<button class="lb-close" type="button" aria-label="Fermer (Échap)">&times;</button>' +
      '<img class="lb-img" alt="">' +
      '<div class="lb-cap"></div>';
    document.body.appendChild(ov);

    var big = ov.querySelector(".lb-img");
    var cap = ov.querySelector(".lb-cap");
    var lastFocus = null;

    function open(src, alt, caption) {
      lastFocus = document.activeElement;
      big.src = src; big.alt = alt || "";
      cap.textContent = caption || "";
      ov.classList.add("is-open");
      document.body.style.overflow = "hidden";
      ov.querySelector(".lb-close").focus();
    }
    function close() {
      ov.classList.remove("is-open");
      big.removeAttribute("src");
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    for (var i = 0; i < imgs.length; i++) {
      (function (im) {
        im.setAttribute("tabindex", "0");
        im.setAttribute("role", "button");
        im.setAttribute("aria-label", "Agrandir l'image" + (im.alt ? " : " + im.alt.slice(0, 60) : ""));
        im.addEventListener("click", function () {
          var fig = im.closest("figure");
          var fc = fig ? fig.querySelector("figcaption") : null;
          open(im.currentSrc || im.src, im.alt, fc ? fc.textContent : "");
        });
        im.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); im.click(); }
        });
      })(imgs[i]);
    }

    // Un clic n'importe où sur la surface (image, fond, bouton) ferme.
    ov.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && ov.classList.contains("is-open")) close();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initLightbox);
  else initLightbox();
})();
