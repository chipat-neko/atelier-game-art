/* =========================================================================
   progress.js — Suivi de progression + couche d'engagement (localStorage).
   Expose window.Progress. Chargé AVANT main.js, présent sur TOUTES les pages.
   Clés :
     ag-progress  { "f01": true, ... }          leçons terminées
     ag-activity  { "AAAA-MM-JJ": n, ... }       journal d'activité (heatmap, séries)
     ag-last      { id, t }                      dernière leçon visitée (bandeau « Reprendre »)
     ag-quiz      { "f01": { best, total }, ... } meilleurs scores de QCM
   100% local, aucun fetch.
   ========================================================================= */
(function () {
  "use strict";
  var KEY = "ag-progress";
  var K_ACT = "ag-activity";
  var K_LAST = "ag-last";
  var K_QUIZ = "ag-quiz";

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; }
    catch (e) { return {}; }
  }
  function write(key, obj) {
    try { localStorage.setItem(key, JSON.stringify(obj)); } catch (e) {}
  }

  /* Date locale au format AAAA-MM-JJ (sans dépendance, sans UTC). */
  function todayStr(d) {
    d = d || new Date();
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
  }

  var state = read(KEY);
  var listeners = [];
  function emit() { listeners.forEach(function (fn) { try { fn(state); } catch (e) {} }); }

  window.Progress = {
    /* ----- Progression (leçons terminées) ----- */
    isDone: function (id) { return !!state[id]; },
    set: function (id, done) {
      if (done) state[id] = true; else delete state[id];
      write(KEY, state);
      emit();
    },
    toggle: function (id) { this.set(id, !state[id]); return !!state[id]; },
    getCompleted: function () { return Object.keys(state); },
    countDone: function (ids) {
      var n = 0; (ids || []).forEach(function (id) { if (state[id]) n++; }); return n;
    },
    reset: function () { state = {}; write(KEY, state); emit(); },
    onChange: function (fn) { listeners.push(fn); },

    /* ----- Journal d'activité (heatmap + séries) ----- */
    logActivity: function () {
      var a = read(K_ACT), k = todayStr();
      a[k] = (a[k] || 0) + 1;
      write(K_ACT, a);
    },
    getActivity: function () { return read(K_ACT); },
    /* Série en cours : nombre de jours consécutifs jusqu'à aujourd'hui (ou hier). */
    streak: function () {
      var a = read(K_ACT);
      var d = new Date(), n = 0;
      // Tolère que l'utilisateur n'ait pas encore étudié AUJOURD'HUI : on part d'hier si besoin.
      if (!a[todayStr(d)]) d.setDate(d.getDate() - 1);
      while (a[todayStr(d)]) { n++; d.setDate(d.getDate() - 1); }
      return n;
    },
    /* Plus longue série historique. */
    bestStreak: function () {
      var a = read(K_ACT);
      var days = Object.keys(a).sort();
      var best = 0, run = 0, prev = null;
      days.forEach(function (k) {
        if (prev) {
          var pd = new Date(prev + "T00:00:00"), cd = new Date(k + "T00:00:00");
          var diff = Math.round((cd - pd) / 86400000);
          run = (diff === 1) ? run + 1 : 1;
        } else { run = 1; }
        if (run > best) best = run;
        prev = k;
      });
      return best;
    },

    /* ----- Dernière leçon visitée ----- */
    setLast: function (id) {
      if (!id) return;
      write(K_LAST, { id: id, t: Date.now() });
    },
    getLast: function () {
      var l = read(K_LAST);
      return (l && l.id) ? l : null;
    },

    /* ----- Visite d'une leçon : mémorise la dernière leçon (« Reprendre »).
       L'activité (séries/heatmap) n'est PAS comptée sur une simple visite :
       elle l'est sur une vraie action d'apprentissage (cf. logActivity ci-dessous,
       appelé sur leçon terminée, QCM/exercice répondu, flashcard notée). ----- */
    touch: function (id) {
      this.setLast(id);
    },

    /* ----- Scores de QCM (meilleur conservé) ----- */
    recordQuiz: function (id, good, total) {
      if (!id || !total) return;
      var q = read(K_QUIZ), prev = q[id];
      if (!prev || good > prev.best) q[id] = { best: good, total: total };
      write(K_QUIZ, q);
    },
    getQuiz: function (id) { var q = read(K_QUIZ); return q[id] || null; },
    getAllQuiz: function () { return read(K_QUIZ); },

    /* ----- Stats globales (accueil / à-propos / tableau de bord) ----- */
    summary: function () {
      if (!window.SITE_DATA) return { done: 0, total: 0, pct: 0, pistes: [] };
      var total = window.SITE_DATA.totalLecons, done = 0, pistes = [];
      window.SITE_DATA.pistes.forEach(function (p) {
        var d = 0;
        p.lecons.forEach(function (l) { if (state[l.id]) { d++; done++; } });
        pistes.push({ id: p.id, titre: p.titre, couleur: p.couleur, done: d, total: p.lecons.length,
          pct: p.lecons.length ? Math.round(d / p.lecons.length * 100) : 0 });
      });
      return { done: done, total: total, pct: total ? Math.round(done / total * 100) : 0, pistes: pistes };
    }
  };
})();
