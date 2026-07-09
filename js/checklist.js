/* =========================================================================
   checklist.js — « Critères de réussite » interactifs (auto-évaluation).
   Amélioration progressive : transforme les <li> des blocs .reussite déjà
   présents dans la leçon en cases à cocher persistées (localStorage, via
   window.Progress). Aucun contenu n'est réécrit : sans JS, la liste reste
   lisible telle quelle.

   Une leçon est « pratiquée » quand TOUS ses critères sont cochés. L'état
   nourrit le tableau de bord (lu vs pratiqué). 100% local, aucun fetch.
   ========================================================================= */
(function () {
  "use strict";

  var P = window.Progress;
  var lessonId = window.CURRENT_LESSON || null;
  if (!P || !lessonId || !P.setCheck) return;

  function init() {
    var blocks = document.querySelectorAll(".reussite");
    if (!blocks.length) return;

    // Collecte à plat de tous les critères (dans l'ordre du document), pour
    // gérer les rares leçons à 2 blocs .reussite avec un index continu.
    var items = [];
    blocks.forEach(function (block) {
      var ul = block.querySelector("ul");
      if (!ul) return;
      // Enfants directs <li> uniquement (sans :scope, pour compat maximale).
      for (var n = 0; n < ul.children.length; n++) {
        var child = ul.children[n];
        if (child.tagName === "LI") items.push({ li: child, ul: ul });
      }
    });
    if (!items.length) return;

    var total = items.length;
    var saved = P.getChecklist(lessonId) || {};
    var checkboxes = [];
    var practiced = false; // garde anti-double-comptage d'activité

    // Barre d'état (posée à la fin du dernier bloc .reussite).
    var bar = document.createElement("div");
    bar.className = "chk-bar";
    bar.setAttribute("role", "status");
    bar.setAttribute("aria-live", "polite");

    items.forEach(function (entry, i) {
      var li = entry.li;
      var wasChecked = !!saved[i];

      var label = document.createElement("label");
      label.className = "chk-item";

      var box = document.createElement("input");
      box.type = "checkbox";
      box.className = "chk-box";
      box.checked = wasChecked;
      box.setAttribute("aria-label", "Critère validé");

      var txt = document.createElement("span");
      txt.className = "chk-txt";
      // Préserve le contenu riche du critère (b, code, kbd…).
      while (li.firstChild) txt.appendChild(li.firstChild);

      label.appendChild(box);
      label.appendChild(txt);
      li.appendChild(label);
      if (wasChecked) li.classList.add("is-checked");

      checkboxes.push(box);

      box.addEventListener("change", function () {
        li.classList.toggle("is-checked", box.checked);
        P.setCheck(lessonId, i, box.checked, total);
        update();
      });
    });

    // Marque la liste comme interactive (styles + a11y).
    blocks.forEach(function (block) {
      block.classList.add("reussite--interactive");
      var ul = block.querySelector("ul");
      if (ul) { ul.classList.add("chk-list"); ul.setAttribute("role", "list"); }
    });

    var lastBlock = blocks[blocks.length - 1];
    lastBlock.appendChild(bar);

    function countDone() {
      var n = 0;
      checkboxes.forEach(function (b) { if (b.checked) n++; });
      return n;
    }

    function update() {
      var done = countDone();
      var complete = done === total;
      if (complete) {
        bar.className = "chk-bar is-complete";
        bar.innerHTML = '<span class="chk-badge">✓ Pratique validée</span>' +
          '<span class="chk-count">' + total + ' / ' + total + ' critères</span>';
        // Comptabilise l'activité une seule fois au moment où la leçon
        // devient « pratiquée » dans cette session.
        if (!practiced) {
          practiced = true;
          if (P.logActivity) P.logActivity();
        }
      } else {
        practiced = false;
        bar.className = "chk-bar";
        bar.innerHTML = '<span class="chk-badge chk-badge--todo">À valider</span>' +
          '<span class="chk-count">' + done + ' / ' + total + ' critères cochés</span>';
      }
    }

    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
