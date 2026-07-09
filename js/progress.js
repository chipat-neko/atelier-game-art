/* =========================================================================
   progress.js — Suivi de progression + couche d'engagement (localStorage).
   Expose window.Progress. Chargé AVANT main.js, présent sur TOUTES les pages.
   Clés :
     ag-progress  { "f01": true, ... }          leçons terminées
     ag-activity  { "AAAA-MM-JJ": n, ... }       journal d'activité (heatmap, séries)
     ag-last      { id, t }                      dernière leçon visitée (bandeau « Reprendre »)
     ag-quiz      { "f01": { best, total }, ... } meilleurs scores de QCM
     ag-check     { "l01": { done:{0:1,...}, total } } critères de pratique cochés
   100% local, aucun fetch.
   ========================================================================= */
(function () {
  "use strict";
  var KEY = "ag-progress";
  var K_ACT = "ag-activity";
  var K_LAST = "ag-last";
  var K_QUIZ = "ag-quiz";
  var K_CHECK = "ag-check";

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

    /* ----- Pratique validée (checklists « Critères de réussite ») -----
       Stocke, par leçon, l'ensemble des critères cochés et leur total.
       Une leçon est « pratiquée » quand tous ses critères sont cochés. ----- */
    setCheck: function (lessonId, index, checked, total) {
      if (!lessonId) return;
      var c = read(K_CHECK), e = c[lessonId] || { done: {}, total: total || 0 };
      if (total) e.total = total;
      if (checked) e.done[index] = 1; else delete e.done[index];
      c[lessonId] = e;
      write(K_CHECK, c);
    },
    /* Renvoie la map { index: 1 } des critères cochés d'une leçon. */
    getChecklist: function (lessonId) {
      var c = read(K_CHECK), e = c[lessonId];
      return e ? (e.done || {}) : {};
    },
    isPracticed: function (lessonId) {
      var c = read(K_CHECK), e = c[lessonId];
      if (!e || !e.total) return false;
      return Object.keys(e.done || {}).length >= e.total;
    },
    countPracticed: function (ids) {
      var c = read(K_CHECK), n = 0;
      (ids || []).forEach(function (id) {
        var e = c[id];
        if (e && e.total && Object.keys(e.done || {}).length >= e.total) n++;
      });
      return n;
    },

    /* ----- Stats globales (accueil / à-propos / tableau de bord) ----- */
    summary: function () {
      if (!window.SITE_DATA) return { done: 0, total: 0, pct: 0, practiced: 0, pistes: [] };
      var chk = read(K_CHECK);
      function practicedOf(id) {
        var e = chk[id];
        return !!(e && e.total && Object.keys(e.done || {}).length >= e.total);
      }
      var total = window.SITE_DATA.totalLecons, done = 0, practiced = 0, pistes = [];
      window.SITE_DATA.pistes.forEach(function (p) {
        var d = 0, pr = 0;
        p.lecons.forEach(function (l) {
          if (state[l.id]) { d++; done++; }
          if (practicedOf(l.id)) { pr++; practiced++; }
        });
        pistes.push({ id: p.id, titre: p.titre, couleur: p.couleur, done: d, total: p.lecons.length,
          practiced: pr, pct: p.lecons.length ? Math.round(d / p.lecons.length * 100) : 0 });
      });
      return { done: done, total: total, practiced: practiced,
        pct: total ? Math.round(done / total * 100) : 0, pistes: pistes };
    }
  };
})();
