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

  function mountQuiz(holder, recordKey) {
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

      // Seconde chance : le score retient la PREMIÈRE tentative, mais on laisse
      // l'apprenant continuer à cliquer jusqu'à trouver la bonne réponse.
      var firstDone = false, solved = false;
      q.querySelectorAll(".quiz__opt").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (solved) return;
          var ok = btn.getAttribute("data-correct") === "1";
          if (!firstDone) {
            answered++; if (ok) good++; firstDone = true;
            if (window.Progress && window.Progress.logActivity) window.Progress.logActivity();
          }
          if (ok) {
            solved = true;
            btn.classList.add("is-correct");
            q.querySelectorAll(".quiz__opt").forEach(function (b) { b.disabled = true; });
            var ex = q.querySelector(".quiz__explain");
            if (ex) ex.hidden = false;
          } else {
            // mauvaise réponse : on la grise, on garde les autres cliquables.
            btn.classList.add("is-wrong");
            btn.disabled = true;
          }
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
        if (window.Progress && window.Progress.recordQuiz && recordKey) {
          window.Progress.recordQuiz(recordKey, good, total);
        }
      }
    }
    updateScore();

    // Monte le QCM juste après le bloc JSON, dans la même section.
    if (holder.parentNode) {
      holder.parentNode.insertBefore(mount, holder.nextSibling);
    }
  }

  function initQuiz() {
    var cur = window.CURRENT_LESSON || null;
    // QCM « Vérifie ta compréhension » de la leçon.
    mountQuiz(document.querySelector("[data-quiz]"), cur);
    // QCM-bilan de fin de piste (clé distincte pour ne pas écraser le score de leçon).
    mountQuiz(document.querySelector("[data-quiz-bilan]"), cur ? cur + "-bilan" : null);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initQuiz);
  } else {
    initQuiz();
  }
})();


/* =========================================================================
   Exercices auto-corrigés — lit les blocs <script type="application/json"
   data-exos> et rend, pour chacun, une question à réponse saisie, corrigée
   localement (indices progressifs, explication). Adapté à tous les langages
   (on fait « prédire la sortie / donner la valeur »). 100% local.
   Format : [ { "q":"…", "accept":["…","…"], "placeholder":"…",
                "hints":["…"], "explain":"…" } ]
   ========================================================================= */
(function () {
  "use strict";
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&quot;";
    });
  }
  // Normalise pour comparer : minuscules, sans accents, espaces compactés.
  function norm(s) {
    return String(s).trim().toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/\s+/g, " ");
  }
  // Nombres en lettres → chiffres (0–16) pour accepter « trois » comme « 3 ».
  var NUMW = { zero:"0", un:"1", une:"1", deux:"2", trois:"3", quatre:"4",
    cinq:"5", six:"6", sept:"7", huit:"8", neuf:"9", dix:"10", onze:"11",
    douze:"12", treize:"13", quatorze:"14", quinze:"15", seize:"16" };
  function w2d(s) {
    return s.replace(/\b(zero|une?|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize|quatorze|quinze|seize)\b/g,
      function (m) { return NUMW[m] || m; });
  }
  // Réponse correcte ? Tolère « trois »/« 3 » et un nombre noyé dans une phrase
  // (« i = 5 », « 3 éléments »), sans rien lâcher sur les réponses symboliques.
  function matches(ans, list) {
    var na = w2d(ans);
    for (var i = 0; i < list.length; i++) { if (na === w2d(list[i])) return true; }
    var nums = na.match(/\d+/g);
    if (nums) {
      for (var j = 0; j < list.length; j++) {
        if (/^\d+$/.test(list[j]) && nums.indexOf(list[j]) !== -1) return true;
      }
    }
    return false;
  }

  function renderExos(holder) {
    var data;
    try { data = JSON.parse(holder.textContent); } catch (e) { return; }
    if (!data || !data.length) return;

    var mount = document.createElement("div");
    mount.className = "exos-int";

    data.forEach(function (item, i) {
      var accept = (item.accept || []).map(norm);
      var hints = item.hints || [];
      var card = document.createElement("div");
      card.className = "exo-int";

      var html =
        '<div class="exo-int-head"><span class="exo-int-num">Exercice express ' + (i + 1) + '</span></div>' +
        '<p class="exo-int-q">' + esc(item.q) + '</p>' +
        '<div class="exo-int-row">' +
          '<input type="text" class="exo-int-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + esc(item.placeholder || "Ta réponse…") + '">' +
          '<button type="button" class="btn btn-primary btn-sm exo-int-check">Vérifier</button>' +
        '</div>' +
        '<div class="exo-int-feedback" role="status" aria-live="polite" hidden></div>';
      if (hints.length) {
        html += '<button type="button" class="exo-int-hint-btn">Besoin d’un indice&nbsp;?</button>' +
                '<ul class="exo-int-hints"></ul>';
      }
      card.innerHTML = html;

      var input = card.querySelector(".exo-int-input");
      var checkBtn = card.querySelector(".exo-int-check");
      var fb = card.querySelector(".exo-int-feedback");
      var solved = false;

      function check() {
        if (solved) return;
        var val = norm(input.value);
        if (!val) return;
        if (matches(val, accept)) {
          solved = true;
          if (window.Progress && window.Progress.logActivity) window.Progress.logActivity();
          card.classList.add("is-solved");
          input.disabled = true; checkBtn.disabled = true;
          fb.className = "exo-int-feedback is-ok";
          fb.innerHTML = "✓ Correct&nbsp;!" + (item.explain ? ' <span class="exo-int-explain">' + esc(item.explain) + "</span>" : "");
          fb.hidden = false;
        } else {
          card.classList.remove("is-ok");
          fb.className = "exo-int-feedback is-err";
          fb.textContent = "Pas encore. Réessaie" + (hints.length ? " — ou affiche un indice." : ".");
          fb.hidden = false;
        }
      }
      checkBtn.addEventListener("click", check);
      input.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); check(); } });

      var hintBtn = card.querySelector(".exo-int-hint-btn");
      if (hintBtn) {
        var shown = 0, list = card.querySelector(".exo-int-hints");
        hintBtn.addEventListener("click", function () {
          if (shown >= hints.length) return;
          var li = document.createElement("li");
          li.textContent = hints[shown];
          list.appendChild(li);
          shown++;
          if (shown >= hints.length) { hintBtn.disabled = true; hintBtn.textContent = "Plus d’indice"; }
          else hintBtn.textContent = "Autre indice (" + shown + "/" + hints.length + ")";
        });
      }

      mount.appendChild(card);
    });

    if (holder.parentNode) holder.parentNode.insertBefore(mount, holder.nextSibling);
  }

  function initExos() {
    var holders = document.querySelectorAll('script[type="application/json"][data-exos]');
    for (var i = 0; i < holders.length; i++) renderExos(holders[i]);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initExos);
  else initExos();
})();

