/* =========================================================================
   donnees-perso.js — Page « Mes données » (donnees-perso.html).
   Voir / exporter / importer / effacer les données locales (clés ag-*).
   100% local, aucun fetch. Compatible file://.
   ========================================================================= */
(function () {
  "use strict";

  var LABELS = {
    "ag-progress": "Leçons terminées",
    "ag-activity": "Journal d'activité (heatmap, séries)",
    "ag-last": "Dernière leçon visitée",
    "ag-quiz": "Meilleurs scores de QCM",
    "ag-check": "Pratique validée (critères de réussite)",
    "ag-theme": "Thème (clair / sombre)",
    "ag-accent": "Palette d'accent",
    "ag-notes": "Notes de leçon",
    "ag-hl": "Surlignages",
    "ag-revision": "Révision (flashcards, Leitner)",
    "ag-pomodoro": "Sessions Pomodoro (par jour)",
    "ag-pomo-state": "Minuteur Pomodoro (état)",
    "ag-changelog-seen": "Nouveautés déjà vues"
  };

  function $(id) { return document.getElementById(id); }

  function agKeys() {
    var out = [];
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf("ag-") === 0) out.push(k);
    }
    return out.sort();
  }

  function bytes(s) {
    // taille approximative en octets (UTF-8)
    try { return new Blob([s]).size; } catch (e) { return (s || "").length; }
  }
  function human(n) {
    if (n < 1024) return n + " o";
    return (n / 1024).toFixed(1) + " Ko";
  }
  function count(key, raw) {
    try {
      var v = JSON.parse(raw);
      if (v && typeof v === "object") return Object.keys(v).length + " entrée" + (Object.keys(v).length > 1 ? "s" : "");
    } catch (e) {}
    return "—";
  }

  function render() {
    var host = $("dp-list"); if (!host) return;
    var keys = agKeys();
    var totalBytes = 0;
    if (!keys.length) {
      host.innerHTML = '<p class="ds-empty">Aucune donnée enregistrée pour l’instant. Termine une leçon ou réponds à un QCM, puis reviens ici.</p>';
      $("dp-total").textContent = "0 o";
      return;
    }
    var html = '<table class="ds-table"><thead><tr><th>Donnée</th><th>Détail</th><th>Taille</th><th></th></tr></thead><tbody>';
    keys.forEach(function (k) {
      var raw = localStorage.getItem(k) || "";
      var b = bytes(raw); totalBytes += b;
      html += '<tr><td><b>' + (LABELS[k] || k) + '</b><br><span class="ds-dim dp-key">' + k + '</span></td>' +
        '<td class="ds-dim">' + count(k, raw) + '</td>' +
        '<td>' + human(b) + '</td>' +
        '<td><button class="btn btn-ghost btn-sm" data-erase="' + k + '">Effacer</button></td></tr>';
    });
    html += '</tbody></table>';
    host.innerHTML = html;
    $("dp-total").textContent = human(totalBytes);

    host.querySelectorAll("[data-erase]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var k = btn.getAttribute("data-erase");
        if (confirm('Effacer « ' + (LABELS[k] || k) + ' » ? Cette action est irréversible.')) {
          try { localStorage.removeItem(k); } catch (e) {}
          render();
        }
      });
    });
  }

  function exportData() {
    var data = {};
    agKeys().forEach(function (k) {
      var raw = localStorage.getItem(k);
      try { data[k] = JSON.parse(raw); } catch (e) { data[k] = raw; }
    });
    var payload = { app: "atelier-game-art", version: 1, exported: new Date().toISOString(), data: data };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    var d = new Date();
    a.href = url;
    a.download = "atelier-game-art-donnees-" + d.getFullYear() + (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1) + (d.getDate() < 10 ? "0" : "") + d.getDate() + ".json";
    document.body.appendChild(a); a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
    flash("Données exportées.");
  }

  function importData(file) {
    var reader = new FileReader();
    reader.onload = function () {
      var obj;
      try { obj = JSON.parse(reader.result); } catch (e) { flash("Fichier illisible (JSON invalide).", true); return; }
      var data = (obj && obj.data) ? obj.data : obj; // tolère un export brut
      if (!data || typeof data !== "object") { flash("Format non reconnu.", true); return; }
      var keys = Object.keys(data).filter(function (k) { return k.indexOf("ag-") === 0; });
      if (!keys.length) { flash("Aucune donnée « ag- » dans ce fichier.", true); return; }
      if (!confirm("Importer " + keys.length + " jeu(x) de données ? Les valeurs existantes seront remplacées.")) return;
      keys.forEach(function (k) {
        var v = data[k];
        try { localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v)); } catch (e) {}
      });
      render();
      flash("Import terminé. Recharge les autres pages pour voir les changements.");
    };
    reader.readAsText(file);
  }

  function eraseAll() {
    var keys = agKeys();
    if (!keys.length) { flash("Rien à effacer."); return; }
    if (!confirm("Tout effacer (" + keys.length + " jeu(x) de données) ? Progression, scores, activité, thème… seront perdus. Action irréversible.")) return;
    keys.forEach(function (k) { try { localStorage.removeItem(k); } catch (e) {} });
    render();
    flash("Toutes les données locales ont été effacées.");
  }

  function flash(msg, isErr) {
    var f = $("dp-flash"); if (!f) return;
    f.textContent = msg;
    f.className = "dp-flash" + (isErr ? " is-err" : " is-ok");
    f.hidden = false;
    clearTimeout(flash._t);
    flash._t = setTimeout(function () { f.hidden = true; }, 4000);
  }

  function init() {
    render();
    var be = $("dp-export"); if (be) be.addEventListener("click", exportData);
    var ba = $("dp-erase-all"); if (ba) ba.addEventListener("click", eraseAll);
    var fi = $("dp-import"); if (fi) fi.addEventListener("change", function () {
      if (fi.files && fi.files[0]) importData(fi.files[0]);
      fi.value = "";
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
