/* =========================================================================
   highlight-mini.js — Coloration syntaxique minimale, 100% locale.
   Vendé localement (aucune dépendance CDN, aucun réseau).
   Usage (dans les leçons) :
     <div class="codeblock" data-lang="C#">
       <pre><code>... code échappé ...</code></pre>
     </div>
   Le script ajoute l'en-tête (langue + bouton Copier) et colore les tokens.
   Langages : csharp, cpp/hlsl/glsl, json, bash, xml. Sinon : neutre.
   ========================================================================= */
(function () {
  "use strict";

  var KEYWORDS = {
    csharp: ["using","namespace","class","struct","interface","enum","public","private","protected","internal","static","readonly","const","void","var","new","return","if","else","for","foreach","in","while","do","switch","case","break","continue","default","this","base","null","true","false","override","virtual","abstract","async","await","get","set","using","try","catch","finally","throw","is","as","ref","out","params","yield","sealed","partial"],
    cpp: ["void","float","float2","float3","float4","half","half3","half4","int","uint","bool","struct","return","if","else","for","while","in","out","inout","const","static","uniform","sampler2D","texture2D","tex2D","SamplerState","Texture2D","cbuffer","register","fixed","fixed4","fixed3","double","true","false","discard","lerp","saturate","dot","cross","normalize","mul","clamp","pow","frac","step","smoothstep"],
    json: ["true","false","null"],
    bash: ["cd","ls","mkdir","cp","mv","rm","echo","export","cat","git","npm","sudo","cmake","python","pip","chmod","curl","source","if","then","else","fi","for","do","done","while","in"],
    xml: []
  };
  var TYPES = {
    csharp: ["int","float","double","bool","string","char","byte","object","Vector2","Vector3","Vector4","Quaternion","Color","Transform","GameObject","Material","Texture2D","Mesh","Shader","Camera","Light","Rigidbody","MonoBehaviour","List","Dictionary","Array","Debug","Mathf","Time","Input"],
    cpp: ["FVector","FRotator","FLinearColor","UMaterial","UTexture","UStaticMesh","AActor","float3x3","float4x4"],
    json: [], bash: [], xml: []
  };

  function aliasLang(s) {
    s = (s || "").toLowerCase();
    if (/c#|csharp|cs\b/.test(s)) return "csharp";
    if (/hlsl|glsl|shader|cg|cpp|c\+\+/.test(s)) return "cpp";
    if (/json/.test(s)) return "json";
    if (/bash|sh|shell|console|terminal/.test(s)) return "bash";
    if (/xml|html|uxml/.test(s)) return "xml";
    return "plain";
  }
  function esc(s) {
    return s.replace(/[&<>]/g, function (c) { return c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;"; });
  }
  function span(cls, txt) { return '<span class="tok-' + cls + '">' + esc(txt) + "</span>"; }

  function tokenize(code, lang) {
    if (lang === "plain") return esc(code);
    var kw = KEYWORDS[lang] || [], ty = TYPES[lang] || [];
    var kwSet = {}, tySet = {};
    kw.forEach(function (k) { kwSet[k] = 1; });
    ty.forEach(function (t) { tySet[t] = 1; });
    var out = "", i = 0, n = code.length;
    var lineComment = (lang === "bash") ? "#" : "//";

    while (i < n) {
      var c = code[i], c2 = code.substr(i, 2);

      // Commentaire de ligne
      if (c2 === lineComment || (lineComment === "#" && c === "#")) {
        var j = code.indexOf("\n", i); if (j === -1) j = n;
        out += span("comment", code.slice(i, j)); i = j; continue;
      }
      // Commentaire bloc /* */
      if ((lang === "csharp" || lang === "cpp") && c2 === "/*") {
        var k = code.indexOf("*/", i + 2); k = (k === -1) ? n : k + 2;
        out += span("comment", code.slice(i, k)); i = k; continue;
      }
      // Chaînes
      if (c === '"' || c === "'" || c === "`") {
        var q = c, s = i + 1, str = c;
        while (s < n) {
          if (code[s] === "\\") { str += code.substr(s, 2); s += 2; continue; }
          str += code[s]; if (code[s] === q) { s++; break; } s++;
        }
        out += span("string", str); i = s; continue;
      }
      // Nombres
      if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(code[i + 1] || ""))) {
        var m = /^0x[0-9a-fA-F]+|^[0-9]*\.?[0-9]+(e[+-]?[0-9]+)?f?/.exec(code.slice(i));
        if (m) { out += span("number", m[0]); i += m[0].length; continue; }
      }
      // Identifiants / mots-clés / types / fonctions
      if (/[A-Za-z_$#@]/.test(c)) {
        var id = /^[A-Za-z_$#@][A-Za-z0-9_$]*/.exec(code.slice(i))[0];
        var after = code.slice(i + id.length);
        var isCall = /^\s*\(/.test(after);
        if (kwSet[id]) out += span("keyword", id);
        else if (tySet[id] || (/^[A-Z]/.test(id) && lang !== "bash")) out += span("type", id);
        else if (isCall) out += span("function", id);
        else if (lang === "json" && /^\s*:/.test(after)) out += span("attr", id);
        else out += esc(id);
        i += id.length; continue;
      }
      // Ponctuation
      if (/[{}()\[\];,.<>+\-*/=&|!%:?~^]/.test(c)) {
        out += span("punct", c); i++; continue;
      }
      out += esc(c); i++;
    }
    return out;
  }

  var COPY_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  var CHECK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function enhance() {
    var blocks = document.querySelectorAll(".codeblock");
    Array.prototype.forEach.call(blocks, function (block) {
      if (block.dataset.enhanced) return;
      block.dataset.enhanced = "1";
      var codeEl = block.querySelector("pre code");
      if (!codeEl) return;
      var rawLang = block.getAttribute("data-lang") || "";
      var lang = aliasLang(rawLang);
      var raw = codeEl.textContent;

      // Coloration
      try { codeEl.innerHTML = tokenize(raw, lang); } catch (e) { /* neutre si échec */ }

      // En-tête : langue + bouton copier
      if (!block.querySelector(".cb-head")) {
        var head = document.createElement("div");
        head.className = "cb-head";
        head.innerHTML = '<span class="cb-lang">' + (rawLang || "code") + '</span>' +
          '<button class="cb-copy" type="button" aria-label="Copier le code">' + COPY_ICON + '<span>Copier</span></button>';
        block.insertBefore(head, block.firstChild);
        var btn = head.querySelector(".cb-copy");
        btn.addEventListener("click", function () {
          copyText(raw).then(function () {
            btn.classList.add("copied");
            btn.innerHTML = CHECK_ICON + "<span>Copié !</span>";
            setTimeout(function () {
              btn.classList.remove("copied");
              btn.innerHTML = COPY_ICON + "<span>Copier</span>";
            }, 1600);
          });
        });
      }
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { return fallback(text); });
    }
    return fallback(text);
  }
  function fallback(text) {
    return new Promise(function (resolve) {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta); resolve();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance);
  else enhance();
  window.HighlightMini = { enhance: enhance };
})();
