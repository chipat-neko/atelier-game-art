/* =========================================================================
   progress.js — Suivi de progression via localStorage.
   Expose window.Progress. Chargé AVANT main.js.
   Stocke un objet { "f01": true, ... } sous la clé "ag-progress".
   ========================================================================= */
(function () {
  "use strict";
  var KEY = "ag-progress";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(obj) {
    try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) {}
  }

  var state = load();
  var listeners = [];

  window.Progress = {
    isDone: function (id) { return !!state[id]; },
    set: function (id, done) {
      if (done) state[id] = true; else delete state[id];
      save(state);
      listeners.forEach(function (fn) { try { fn(state); } catch (e) {} });
    },
    toggle: function (id) { this.set(id, !state[id]); return !!state[id]; },
    getCompleted: function () { return Object.keys(state); },
    countDone: function (ids) {
      var n = 0; (ids || []).forEach(function (id) { if (state[id]) n++; }); return n;
    },
    reset: function () { state = {}; save(state); listeners.forEach(function (fn) { fn(state); }); },
    onChange: function (fn) { listeners.push(fn); },
    // Stats globales pour les pages d'accueil/à-propos.
    summary: function () {
      if (!window.SITE_DATA) return { done: 0, total: 0, pct: 0, pistes: [] };
      var total = window.SITE_DATA.totalLecons, done = 0, pistes = [];
      window.SITE_DATA.pistes.forEach(function (p) {
        var d = 0;
        p.lecons.forEach(function (l) { if (state[l.id]) { d++; done++; } });
        pistes.push({ id: p.id, titre: p.titre, done: d, total: p.lecons.length,
          pct: p.lecons.length ? Math.round(d / p.lecons.length * 100) : 0 });
      });
      return { done: done, total: total, pct: total ? Math.round(done / total * 100) : 0, pistes: pistes };
    }
  };
})();
