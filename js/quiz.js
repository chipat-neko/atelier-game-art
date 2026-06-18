/* =========================================================================
   quiz.js — QCM interactif « Vérifie ta compréhension ».
   100% local, aucun fetch. Lit un bloc <script type="application/json" data-quiz>
   placé dans une section, et rend un QCM cliquable (réponse + explication + score).
   Format des données :
     [ { "q": "...", "a": ["bonne", "mauvaise", ...], "correct": 0, "explain": "..." } ]
   « correct » est l'index de la bonne réponse dans le tableau d'origine.
   ========================================================================= */
(function () {
  "use strict";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&quot;";
    });
  }

  // Hash déterministe d'une chaîne (variante djb2) → entier positif.
  // Sert à varier l'ordre des options de façon imprévisible d'une question à
  // l'autre, tout en restant stable au rechargement (aucun hasard).
  function hashStr(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) {
      h = ((h << 5) + h + s.charCodeAt(i)) | 0; // h*33 + c
    }
    return Math.abs(h);
  }

  // Décalage circulaire des options. Le décalage est dérivé du texte de la
  // question (et de son index), de sorte que la bonne réponse ne tombe pas
  // toujours à la même position et reste imprévisible sans introduire de hasard.
  function rotate(arr, by) {
    var n = arr.length;
    if (n < 2) return arr.slice();
    var k = ((by % n) + n) % n;
    return arr.slice(k).concat(arr.slice(0, k));
  }

  function initQuiz() {
    var holder = document.querySelector("[data-quiz]");
    if (!holder) return;

    var data;
    try { data = JSON.parse(holder.textContent); } catch (e) { return; }
    if (!data || !data.length) return;

    var mount = document.createElement("div");
    mount.className = "quiz";
    mount.setAttribute("role", "group");
    mount.setAttribute("aria-label", "QCM d'auto-évaluation");

    var total = data.length;
    var answered = 0;
    var good = 0;

    data.forEach(function (item, qi) {
      var opts = item.a.map(function (text, i) {
        return { text: text, correct: i === (item.correct || 0) };
      });
      // Décalage dérivé du texte de la question (+ index) : varié et imprévisible,
      // mais déterministe (même ordre à chaque rechargement).
      opts = rotate(opts, hashStr(item.q) + qi + 1);

      var q = document.createElement("div");
      q.className = "quiz__q";
      var html =
        '<p class="quiz__prompt"><span class="quiz__n">' + (qi + 1) + ".</span> " +
        esc(item.q) + "</p>" +
        '<div class="quiz__options">';
      opts.forEach(function (o) {
        html +=
          '<button class="quiz__opt" type="button" data-correct="' +
          (o.correct ? "1" : "0") + '">' +
          '<span class="quiz__mark" aria-hidden="true"></span>' +
          '<span class="quiz__txt">' + esc(o.text) + "</span></button>";
      });
      html += "</div>";
      if (item.explain) {
        html += '<p class="quiz__explain" hidden><b>Pourquoi&nbsp;:</b> ' + esc(item.explain) + "</p>";
      }
      q.innerHTML = html;

      var locked = false;
      q.querySelectorAll(".quiz__opt").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (locked) return;
          locked = true;
          var ok = btn.getAttribute("data-correct") === "1";
          answered++;
          if (ok) {
            good++;
            btn.classList.add("is-correct");
          } else {
            btn.classList.add("is-wrong");
            q.querySelectorAll('.quiz__opt[data-correct="1"]').forEach(function (g) {
              g.classList.add("is-correct");
            });
          }
          q.querySelectorAll(".quiz__opt").forEach(function (b) { b.disabled = true; });
          var ex = q.querySelector(".quiz__explain");
          if (ex) ex.hidden = false;
          updateScore();
        });
      });

      mount.appendChild(q);
    });

    var score = document.createElement("p");
    score.className = "quiz__score";
    score.setAttribute("aria-live", "polite");
    mount.appendChild(score);

    function updateScore() {
      if (answered < total) {
        score.textContent = answered + " / " + total + " répondues";
      } else {
        score.textContent = "Score : " + good + " / " + total +
          (good === total ? " — parfait ! 🎉" : "");
        score.classList.add("is-final");
        // Persiste le meilleur score de ce QCM (tableau de bord).
        if (window.Progress && window.Progress.recordQuiz && window.CURRENT_LESSON) {
          window.Progress.recordQuiz(window.CURRENT_LESSON, good, total);
        }
      }
    }
    updateScore();

    // Monte le QCM juste après le bloc JSON, dans la même section.
    if (holder.parentNode) {
      holder.parentNode.insertBefore(mount, holder.nextSibling);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initQuiz);
  } else {
    initQuiz();
  }
})();
