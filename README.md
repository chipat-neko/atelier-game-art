# Atelier Game Art — Cours de graphisme & création d'assets (Unity & Unreal)

Site web **statique, 100 % local et hors-ligne** pour apprendre la création de graphismes et d'assets de jeu vidéo, des fondamentaux jusqu'à l'intégration dans les trois moteurs majeurs — **Unity 6.3 LTS**, **Unreal Engine 5.7** et **Godot 4.x** — avec un parcours complet dédié à **Blender 4.x**. Pédagogie centrée sur le **pourquoi** autant que le **comment**.

## Ouvrir le site

Double-cliquer sur **`index.html`**. Aucun serveur, aucune installation, aucune connexion Internet requise. Fonctionne en mode avion.

## Contraintes techniques respectées

- **Aucun build, aucun serveur** : HTML/CSS/JS *vanilla*.
- **Compatible `file://`** : aucun `fetch()` de fichier local. Le contenu manipulé en JS (curriculum, glossaire, index de recherche) est **embarqué** dans des fichiers `.js` chargés par `<script>`.
- **100 % hors-ligne** : aucune URL CDN, aucune police distante, aucune image externe. Librairie de coloration syntaxique **maison**, vendue dans `assets/vendor/`.
- **Chemins relatifs** partout (les pages de leçon utilisent le préfixe `../../`).
- **`localStorage`** pour la progression et le thème.
- Vérifié : **0 lien interne cassé**, **0 appel réseau**.

## Structure

```
cours_graph/
├── index.html              Accueil + carte des 5 pistes
├── glossaire.html          Glossaire global (~283 termes), filtrable
├── a-propos.html           Mode d'emploi, prérequis matériels, reset progression
├── README.md               Ce fichier
├── css/
│   └── style.css           Design system unique (tokens, thèmes clair/sombre, callouts, code, impression)
├── js/
│   ├── site-data.js        Manifeste du curriculum = source de vérité (pistes, leçons, métadonnées)
│   ├── main.js             Sidebar, thème, navigation préc/suiv, sommaire (TOC) + scrollspy, menu mobile
│   ├── progress.js         Suivi de progression (localStorage), barres et %
│   ├── search-index.js     Recherche full-text locale (modal + surlignage)
│   └── glossaire-data.js   Données du glossaire (objet JS embarqué)
├── assets/
│   ├── vendor/highlight-mini.js   Coloration syntaxique locale + bouton « copier »
│   └── img/favicon.svg
└── cours/   (ordre des pistes = ordre d'apprentissage)
    ├── fondamentaux/   Piste 0 · F1 → F12  (image numérique, théorie artistique, formats, topologie,
    │                              pipeline, UV, PBR, baking, shaders, animation, VFX, optimisation)
    ├── logiciels/      Piste 1 · L1 → L5   (Blender, Substance, 2D, sculpt/ZBrush, bibliothèques d'assets)
    ├── blender/        Piste 2 · B1 → B11  (installation, interface, modélisation, modifiers, sculpt/retopo,
    │                              UV, shading, texture paint/bake, Geometry Nodes, rigging/anim, export)
    ├── unity/          Piste 3 · U1 → U11  (install, éditeur, pipelines, projet, import, matériaux,
    │                              éclairage, post-process, VFX, packages, optimisation)
    ├── unreal/         Piste 4 · E1 → E10  (install, éditeur, projet, import, Material Editor, Lumen,
    │                              Nanite, Niagara, plugins, optimisation)
    ├── godot/          Piste 5 · G1 → G11  (install, éditeur nodes, renderers, projet, import, matériaux,
    │                              éclairage SDFGI, environnement, VFX, plugins/AssetLib, optimisation)
    └── comparaison/    Piste 6 · C1 → C3   (Unity vs Unreal, transfert d'assets, choisir son moteur)
```

**63 leçons** au total, réparties en **7 pistes** (Fondamentaux, Logiciels, Blender, Unity, Unreal, Godot, Comparaison).

## Fonctionnalités

- **Suivi de progression** : case « leçon terminée » par page, barre globale et % par piste dans la sidebar (persisté en `localStorage`). Réinitialisation possible depuis *À propos*.
- **Recherche locale** : touche <kbd>/</kbd> ou <kbd>Ctrl</kbd>+<kbd>K</kbd> ; cherche dans les titres, descriptions, mots-clés et le glossaire ; surlignage des correspondances (robuste aux accents et à `œ/æ`).
- **Glossaire global** filtrable, navigation alphabétique, et lien retour vers la leçon qui introduit chaque terme.
- **Thème clair/sombre** mémorisé.
- **Sommaire sticky** par leçon avec mise en surbrillance de la section active.
- **Coloration syntaxique** des blocs de code + bouton « copier ».
- **Impression propre** (`@media print`, fil d'Ariane conservé).
- **Accessibilité** : structure de titres ordonnée, `alt`/`aria-label`, navigation clavier, `aria-expanded` sur le menu, fermeture <kbd>Échap</kbd>.

## Gabarit d'une leçon

Chaque leçon suit la même structure : en-tête (niveau, durée, prérequis) → 🎯 Objectifs → Pourquoi c'est important → Théorie en profondeur → 🔧 Démonstration pas à pas → schéma(s) SVG → ⚠️ Pièges courants (symptôme/cause/correction) → 🔧 Exercice avec critères de réussite → 📌 À retenir → Glossaire de la leçon → Pour aller plus loin → navigation préc/suiv + case « terminée ».

## Données de version (juin 2026)

- **Unity 6.3 LTS** (déc. 2025, support jusqu'à déc. 2027) ; licence **Personal gratuite** (< 200 000 $/an). Pipelines : Built-in, URP, HDRP.
- **Unreal Engine 5.7** (nov. 2025). *UE6 annoncé en mai 2026 mais pas encore téléchargeable* → les cours se basent sur 5.7. Gratuit, royalties de 5 % au-delà d'1 M$ de revenus bruts cumulés par jeu.
- **Godot 4.x** (série 4 : 4.4, 4.5…). Libre et open source (**licence MIT**) : gratuit, **sans royalties ni seuil de revenus**. Renderers : Forward+, Mobile, Compatibility.
- **Fab** (`fab.com`) : marketplace unifiée d'Epic ayant remplacé l'Unreal Marketplace, Quixel.com, le Sketchfab Store et l'ArtStation Marketplace ; sert Unreal **et** Unity. Megascans y est (majorité payante depuis 2025). Quixel Bridge reste utilisé pour MetaHuman.

## Maintenance

**Ajouter / renommer une leçon :**
1. Déclarer la leçon dans `js/site-data.js` (id, fichier, titre, niveau, durée, description, mots-clés) — c'est ce manifeste qui pilote sidebar, navigation préc/suiv, progression et recherche.
2. Créer le fichier HTML dans `cours/<piste>/` en copiant le gabarit d'une leçon existante (en-tête, sidebar et scripts identiques ; ne changer que `<title>`, `window.CURRENT_LESSON`, le fil d'Ariane et le contenu de `<div class="prose">`).

**Enrichir le glossaire :** ajouter des entrées `{ terme, def, alias, src }` dans `js/glossaire-data.js`. Le champ `src` (id de la leçon) crée automatiquement le lien retour. Pas de doublon : un terme par entrée.

**Design :** tout passe par les variables CSS de `css/style.css` (couleurs des pistes, callouts, niveaux). Une seule feuille de style pour toutes les pages.

## Limitations connues / pistes d'amélioration

- **Vérification visuelle** à faire dans un navigateur (rendu, thème, recherche, impression) — non réalisable dans l'environnement de génération.
- **PDF par module** : non généré (option non retenue).
- Les leçons couvrent les *principes* durables ; les interfaces des logiciels peuvent légèrement évoluer d'une version à l'autre.
