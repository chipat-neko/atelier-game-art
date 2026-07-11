# Jerrican — kit d'exercice (modélisation & UV, B3–B6)

Un **jerrican** à modéliser, fourni sous forme de **blockout** (massing brut) à
raffiner jusqu'à la **silhouette cible**. Idéal pour B3 (Edit Mode : extrude,
inset, bevel, loop cut), B4 (modifiers : Mirror, Bevel, Subdivision), et B6 (UV).

## Contenu
- `jerrican_blockout.blend` / `.fbx` / `.glb` — le **point de départ** (boîtes brutes, ~84 tris).
- `silhouette_cible.webp` — la **forme visée** (face + profil), guide de proportions.
- `ref_cible.webp` — un **rendu de référence** de la version raffinée (corps biseauté,
  poignée en arche, bec + bouchon, ~230 tris).
- `blockout_apercu.webp` — aperçu clay du blockout.
- `generer_jerrican.py` — le script Blender headless qui a généré le tout (transparence).

## Consigne type
1. Ouvre le blockout, entre en **Edit Mode** et retravaille la forme vers la silhouette
   (proportions, bec, poignée) — extrude / inset / bevel / loop cut.
2. Ajoute les **modifiers** utiles (Mirror pour la symétrie, Bevel pour les arêtes).
3. **Déplie les UV** (seams + Unwrap) et vérifie la densité au damier.
4. Compare ta silhouette et ton rendu à `silhouette_cible.webp` / `ref_cible.webp`.

Libre d'usage (exercice pédagogique).
