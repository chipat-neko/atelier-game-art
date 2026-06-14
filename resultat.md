# Audit complet (lecture seule) — `d:/cours_graph`

> Objectif : check complet du dossier (qualité, cohérence, UX, accessibilité, performance, robustesse hors-ligne, contenu/pédagogie). Puis générer un fichier résultat avec **quoi ajouter / améliorer / supprimer**.

---

## Résumé exécutif (priorité)

### P0 — Problèmes majeurs à corriger en premier
1. **Doublons et dérives probables du glossaire**
   - `glossaire.html` génère le glossaire en parcourant `window.GLOSSAIRE`.
   - Or `js/glossaire-data.js` contient une *grosse concaténation* : `window.GLOSSAIRE = [ ... ] ; window.GLOSSAIRE = window.GLOSSAIRE.concat([ ... ])` **puis on retrouve une base complète** (le fichier semble dupliqué en contenu dans l’état actuel que j’ai lu : même bloc répété). 
   - Risque : entrées dupliquées (même terme), ordre incohérent, recherche moins fiable, navigation alphabétique gonflée.

2. **TOC (sommaire) potentiellement non robuste : `offsetTop` + sections dynamiques**
   - Le scrollspy dans `js/main.js` repose sur `offsetTop` (sans recalcul au resize/chargement des images/relayout). 
   - Risque : sur certaines tailles d’écran ou avec du contenu qui reflow, le “point actif” du TOC peut être faux.

3. **highlight de la recherche : logique “normalisée” pas 1:1 avec le rendu**
   - `search-index.js` calcule des positions sur une version normalisée (`norm(text)`) mais applique les marques sur les indices du texte original via `marks` de taille `text.length`.
   - Risque : décalages si la normalisation modifie la longueur (accents supprimés, `œ/æ` remplacés). 
   - Risque UX : surlignage incorrect (mais pas bloquant).

4. **Pages de leçon : cohérence de `SITE_ROOT` / liens internes**
   - Côté pages de leçon (ex. `f01`, `f12`, `u07`, `e07`, `c02`), les liens semblent corrects.
   - Mais le risque global reste : si une page oublie `window.SITE_ROOT` ou pointe une racine différente, la navigation + recherche + sidebar peuvent casser.

### P1 — Corrections importantes (robustesse UX / accessibilité / cohérence)
5. **Accessibilité (ARIA) : focus visible et sémantique globale**
   - Beaucoup de composants sont en div/span. Les patterns ARIA sont partiellement présents (ex : search-trigger `role="button"`), mais on peut harmoniser.
   - Le menu mobile ferme sur clic A, mais pas sur clic clavier (Enter/Escape) sur le bouton.

6. **Recherche : modal “open/close” sans remise à zéro propre**
   - `close()` retire la classe `open` mais ne remet pas l’état visuel (sélection `sel`, `current`). 
   - Mineur, mais améliorable pour cohérence.

7. **Performance : génération du TOC et scrollspy sur toutes les pages de leçon**
   - La construction TOC utilise `querySelectorAll("h2, h3")` et un scrollspy sur `scroll` avec `requestAnimationFrame` — correct, mais à sécuriser sur contenus très longs.

8. **Gestion des styles “print” : masquer trop de contenus**
   - En `@media print`, de nombreux éléments sont cachés : headers, sidebar, toc, footers, barres de progression, etc.
   - Le contenu pédagogique reste présent (prose), mais il peut manquer la navigation/repères.

### P2 — Améliorations de qualité (design/pédagogie)
9. **Cohérence “pédagogique” : vérifier les termes vs glossaire**
   - J’ai observé une forte volonté de cohérence (liens vers glossaire + callouts).
   - Mais il faut un contrôle global : éviter définitions contradictoires ou termes non présents.

10. **Orthographe / typographie**
   - De petites inconsistances existent potentiellement (ex : guillemets, espaces insécables, ponctuation). Ce n’est pas bloquant mais améliorable.

11. **Maintenabilité**
   - `js/main.js` et `js/search-index.js` sont propres, mais il manque parfois des protections null/undefined sur des éléments optionnels.

---

## Check-list détaillée : quoi ajouter / améliorer / supprimer

## 1) Glossaire (`glossaire.html`, `js/glossaire-data.js`)

### À améliorer (P0)
- **Déduplication systématique** par `terme` (et idéalement alias) dans `glossaire-data.js`.
- **Éviter la duplication de contenu** dans le fichier : le bloc lu semble répété.
- **Ajouter un invariant** : `terme` unique + normalisation (sans accents/casse) pour éviter les doublons.

### À ajouter (P2)
- Un petit bloc “source” / “pour quel chapitre” déjà partiellement présent via `src`, mais non affiché.
  - Suggestion : afficher un lien de retour vers la leçon d’origine (quand `src` existe) dans la définition.

### À supprimer (P1)
- Le code/commentaire “genere” si le système est incomplet ou génère du bruit (doublons). Sinon le conserver mais clarifier.

---

## 2) Recherche (`js/search-index.js`, modal, surlignage)

### À améliorer (P0)
- **highlight** : corriger le surlignage en faisant un mapping fiable.
  - Option simple : ne pas marquer via positions sur texte original normalisé → utiliser regex sur le texte original avec gestion accents (plus facile à rendre correct).

### À améliorer (P1)
- Ajouter **annulation/cleanup** : sur close, retirer la classe `sel`, réinitialiser `sel` à 0.
- Gestion clavier : permettre navigation modal même si focus ailleurs.

### À ajouter (P2)
- Un message clair “Rechercher : tape ≥ 2 caractères” (déjà présent).
- Ajout d’un compteur résultats (actuellement le moteur retourne top 12, mais pas affiché).

---

## 3) Navigation / Sidebar / Progression (`js/main.js`, `js/progress.js`)

### À améliorer (P0)
- **TOC scrollspy** : recalculer offsets sur `resize` et après chargement (images/relayout).
  - Option : recalculer `items[i].el.getBoundingClientRect().top` relativement au viewport à chaque frame de spy plutôt que `offsetTop`.

### À améliorer (P1)
- Harmoniser les éléments interactifs : remplacer certains `div role="button"` par `button` si possible.

### À ajouter (P2)
- Bouton “Réinitialiser progression” dans une page “À propos” ou un modal (si souhaité).

---

## 4) Robustesse hors-ligne & ressources

### À vérifier / améliorer (P1)
- **Chemins de ressources** : toutes les pages de leçon utilisent `../../css/style.css`, `../../assets/img/favicon.svg`, etc.
  - C’est correct dans les pages inspectées.
  - Mais faire un audit global de toutes les pages du dossier.

### À ajouter (P2)
- Une page “Changelog” local/offline : l’utilisateur sait quelles versions des moteurs sont couvertes.

---

## 5) Accessibilité (A11y)

### À améliorer (P1)
- Focus management modal recherche (déplacer focus dans le input à l’ouverture, et restaurer le focus à la fermeture).
- Ajouter `aria-expanded` sur le bouton menu mobile et sur les `details`.
- Vérifier le contraste sur thème clair et sur callouts.

### À ajouter (P2)
- `lang` ok : pages en `fr`.
- Ajout d’un `role="navigation"` sur nav.

---

## 6) Impression

### À améliorer (P2)
- Aujourd’hui la print hide beaucoup de repères : TOC, sidebar, navigation next/prev.
- Suggestion : en print, afficher au moins le **breadcrumb** et les **titres des sections** (déjà présents) — et éventuellement afficher “Sur cette page” simplifié.

---

## 7) Cohérence design system (CSS)

### À améliorer (P2)
- Typo / classes : s’assurer que toutes les pages utilisent systématiquement les mêmes classes de callouts (`callout objectif`, etc.).
- Vérifier qu’aucune classe non définie est utilisée (n’a pas été exploré exhaustivement).

---

## 8) Qualité pédagogique

### À améliorer (P2)
- Ajouter une section “Checklist de fin de leçon” standardisée sur toutes les leçons (au moins une liste de 4-6 points).
- Standardiser la structure : Objectifs → Pourquoi → Théorie → Démonstration → Pièges → Exercice → À retenir → Pour aller plus loin.
  - Les pages inspectées suivent déjà bien ce pattern.

### À ajouter (P2)
- “Mini-projet” inter-leçons : ex. après F1 + F7 + F12, demander un petit asset complet.

---

## Recommandations d’action (ordre de priorités)

### P0 (immédiat)
1. Corriger/dédoublonner `js/glossaire-data.js` (déduire la duplication apparente).
2. Corriger `search-index.js` pour un highlight correct sur accents/normalisation.
3. Durcir le scrollspy TOC (recalcul offsets sur resize + mapping plus robuste).

### P1 (bientôt)
4. Focus & ARIA modal recherche + menu mobile clavier.
5. Audit global des chemins `SITE_ROOT`/liens entre pages.

### P2 (améliorations)
6. Améliorer l’impression (repères minimaux).
7. Standardiser les sections “fin de leçon”.
8. Ajouter lien “source leçon” depuis glossaire quand `src` existe.

---

## Notes “bonnes choses” (à conserver)
- Design system riche : tokens, callouts, codeblock, schemas SVG cohérents.
- Tout est offline : aucune requête réseau.
- Sidebar + progression localStorage : expérience d’apprentissage engagée.
- Recherche full-text locale : valeur forte.
- Mise en page print : intention déjà là.

---

## Check final “Go/No-Go”
- [ ] Glossaire unique sans doublons (termes + alpha-nav correct).
- [ ] Recherche : surlignage correct et navigation modal clavier OK.
- [ ] TOC : scrollspy correct après resize.
- [ ] Navigation globale : aucune route cassée (SITE_ROOT cohérent).
- [ ] Accessibilité : focus visible + ARIA sur éléments clés.

---

## Fichiers touchés (dans ce tour, lecture seule)
- `index.html`
- `a-propos.html`
- `glossaire.html`
- `css/style.css`
- `js/main.js`
- `js/site-data.js`
- `js/progress.js`
- `js/search-index.js`
- `js/glossaire-data.js`
- Leçons inspectées :
  - `cours/fondamentaux/f01-image-numerique.html`
  - `cours/fondamentaux/f12-optimisation.html`
  - `cours/unity/u07-eclairage.html`
  - `cours/unreal/e07-nanite.html`
  - `cours/comparaison/c02-transfert-assets.html`

