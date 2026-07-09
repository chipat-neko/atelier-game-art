/* =========================================================================
   progression.js — Tableau de bord (page progression.html).
   Agrège window.Progress + window.SITE_DATA. 100% local, aucun fetch.
   ========================================================================= */
(function () {
  "use strict";
  if (!window.SITE_DATA || !window.Progress) return;
  var P = window.Progress, DATA = window.SITE_DATA;

  function $(id) { return document.getElementById(id); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dstr(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

  var sum = P.summary();
  var pistesDone = sum.pistes.filter(function (p) { return p.total && p.done === p.total; }).length;

  /* ---- Cartes de stats ---- */
  function setStat(id, val) { var e = $(id); if (e) e.textContent = val; }
  setStat("ds-lessons", sum.done + " / " + sum.total);
  setStat("ds-practiced", sum.practiced + " / " + sum.total);
  setStat("ds-pct", sum.pct + "%");
  setStat("ds-pistes-done", pistesDone + " / " + sum.pistes.length);
  setStat("ds-streak", P.streak());
  setStat("ds-best-streak", P.bestStreak());

  // Score QCM moyen (sur les QCM tentés)
  var allQuiz = P.getAllQuiz(), qIds = Object.keys(allQuiz);
  var qDone = 0, qPts = 0, qMax = 0;
  qIds.forEach(function (k) { qDone++; qPts += allQuiz[k].best; qMax += allQuiz[k].total; });
  setStat("ds-quiz", qMax ? Math.round(qPts / qMax * 100) + "%" : "—");
  setStat("ds-quiz-sub", qDone ? (qDone + " QCM tenté" + (qDone > 1 ? "s" : "")) : "aucun QCM tenté");

  // Barre globale
  var gf = $("ds-global-fill"); if (gf) gf.style.width = sum.pct + "%";

  /* ---- Badges (dérivés des données existantes) ---- */
  (function () {
    var host = $("ds-badges"); if (!host) return;
    var perfect = qIds.filter(function (k) { return allQuiz[k].best === allQuiz[k].total; }).length;
    var best = P.bestStreak();
    var badges = [
      { ico: "🌱", label: "Première leçon",        ok: sum.done >= 1,    hint: "Termine 1 leçon" },
      { ico: "🎯", label: "Premier parcours",      ok: pistesDone >= 1,  hint: "Termine un parcours entier" },
      { ico: "⛰️", label: "Mi-chemin",             ok: sum.pct >= 50,    hint: "Atteins 50 % du programme" },
      { ico: "🏁", label: "Marathon · 50 leçons",  ok: sum.done >= 50,   hint: "Termine 50 leçons" },
      { ico: "👑", label: "Programme terminé",     ok: sum.pct >= 100,   hint: "Termine les 153 leçons" },
      { ico: "🔥", label: "Série · 3 jours",       ok: best >= 3,        hint: "Étudie 3 jours d'affilée" },
      { ico: "⚡", label: "Régulier · 7 jours",    ok: best >= 7,        hint: "Étudie 7 jours d'affilée" },
      { ico: "💎", label: "QCM parfait",           ok: perfect >= 1,     hint: "Réussis un QCM à 100 %" },
      { ico: "🧠", label: "10 QCM parfaits",       ok: perfect >= 10,    hint: "Réussis 10 QCM à 100 %" }
    ];
    var earned = badges.filter(function (b) { return b.ok; }).length;
    var html = '<p class="ds-badges-count">' + earned + ' / ' + badges.length + ' débloqué' + (earned > 1 ? "s" : "") + '</p><div class="badges-grid">';
    badges.forEach(function (b) {
      html += '<div class="badge-chip' + (b.ok ? " is-earned" : "") + '" title="' + (b.ok ? "Débloqué" : b.hint) + '">' +
        '<span class="bc-ico">' + b.ico + '</span><span class="bc-label">' + b.label + '</span>' +
        (b.ok ? '' : '<span class="bc-hint">' + b.hint + '</span>') + '</div>';
    });
    html += '</div>';
    host.innerHTML = html;
  })();

  /* ---- Bandeau « Reprendre » ---- */
  (function () {
    var b = $("ds-resume"); if (!b) return;
    var last = P.getLast(); if (!last) return;
    var l = (DATA.flat || []).filter(function (x) { return x.id === last.id; })[0];
    if (!l) return;
    b.href = (window.SITE_ROOT || "") + l.href;
    b.innerHTML =
      '<span class="rb-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 4 20 12 6 20 6 4"/></svg></span>' +
      '<span class="rb-text"><span class="rb-label">' + (P.isDone(l.id) ? "Revoir la dernière leçon" : "Reprendre") + '</span>' +
      '<span class="rb-title">' + l.pisteTitre + ' · ' + l.titre + '</span></span>' +
      '<span class="rb-go">Continuer <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>';
    b.hidden = false;
  })();

  /* ---- Heatmap d'activité (17 dernières semaines) ---- */
  (function () {
    var host = $("ds-heatmap"); if (!host) return;
    var act = P.getActivity();
    var WEEKS = 17, today = new Date();
    // On démarre au dimanche il y a (WEEKS-1) semaines, pour aligner des colonnes de 7.
    var start = new Date(today); start.setDate(start.getDate() - (WEEKS * 7 - 1));
    // Recale au début de semaine (dimanche = 0)
    start.setDate(start.getDate() - start.getDay());
    var max = 1; Object.keys(act).forEach(function (k) { if (act[k] > max) max = act[k]; });
    function level(n) {
      if (!n) return 0;
      var r = n / max;
      if (r > 0.66) return 4; if (r > 0.33) return 3; if (r > 0.1) return 2; return 1;
    }
    var html = '<div class="hm-grid">';
    var d = new Date(start);
    for (var w = 0; w < WEEKS; w++) {
      html += '<div class="hm-col">';
      for (var day = 0; day < 7; day++) {
        var key = dstr(d);
        var future = d > today;
        var n = act[key] || 0;
        html += '<span class="hm-cell lv' + (future ? "-x" : level(n)) +
          '" title="' + key + (future ? "" : " — " + n + " activité" + (n > 1 ? "s" : "")) + '"></span>';
        d.setDate(d.getDate() + 1);
      }
      html += '</div>';
    }
    html += '</div>';
    html += '<div class="hm-legend"><span>Moins</span><span class="hm-cell lv0"></span><span class="hm-cell lv1"></span><span class="hm-cell lv2"></span><span class="hm-cell lv3"></span><span class="hm-cell lv4"></span><span>Plus</span></div>';
    host.innerHTML = html;
  })();

  /* ---- Progression par piste ---- */
  (function () {
    var host = $("ds-pistes"); if (!host) return;
    var html = "";
    sum.pistes.forEach(function (p) {
      var prLabel = p.practiced ? '<span class="dsp-prat" title="Leçons dont les critères de réussite sont validés">✓ ' + p.practiced + ' pratiquée' + (p.practiced > 1 ? 's' : '') + '</span>' : '';
      html +=
        '<div class="dsp-row" style="--pc:' + p.couleur + '">' +
          '<div class="dsp-head"><span class="dsp-name">' + p.titre + '</span>' +
          '<span class="dsp-num">' + prLabel + p.done + ' / ' + p.total + '</span></div>' +
          '<div class="dsp-bar"><i style="width:' + p.pct + '%"></i></div>' +
        '</div>';
    });
    host.innerHTML = html;
  })();

  /* ---- Détail des scores de QCM ---- */
  (function () {
    var host = $("ds-quiz-list"); if (!host) return;
    if (!qIds.length) { host.innerHTML = '<p class="ds-empty">Aucun QCM tenté pour l’instant. Réponds aux « Vérifie ta compréhension » dans les leçons : ton meilleur score y sera enregistré.</p>'; return; }
    var byId = {}; (DATA.flat || []).forEach(function (l) { byId[l.id] = l; });
    var rows = qIds.map(function (k) { return { id: k, l: byId[k], q: allQuiz[k] }; })
      .filter(function (r) { return r.l; })
      .sort(function (a, b) { return (b.q.best / b.q.total) - (a.q.best / a.q.total); });
    var html = '<table class="ds-table"><thead><tr><th>Leçon</th><th>Parcours</th><th>Meilleur score</th></tr></thead><tbody>';
    rows.forEach(function (r) {
      var perfect = r.q.best === r.q.total;
      html += '<tr><td><a href="' + (window.SITE_ROOT || "") + r.l.href + '">' + r.l.titre + '</a></td>' +
        '<td class="ds-dim">' + r.l.pisteTitre + '</td>' +
        '<td><span class="ds-score' + (perfect ? ' is-perfect' : '') + '">' + r.q.best + ' / ' + r.q.total + (perfect ? ' 🎉' : '') + '</span></td></tr>';
    });
    html += '</tbody></table>';
    host.innerHTML = html;
  })();
})();
