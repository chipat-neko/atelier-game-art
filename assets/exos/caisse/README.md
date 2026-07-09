# Kit d'exercice — La caisse en bois

Matériel de départ pour les TP de **texturing** et de **baking**. Tu n'as plus à
fabriquer ton propre objet : ouvre ces fichiers et pratique directement la notion visée.

## Contenu

| Fichier | Rôle |
|---|---|
| `caisse_low.blend` | Caisse **low-poly dépliée** (UV faites), matériau bois, prête à texturer/exporter. |
| `caisse_low.fbx` | La low-poly au format **FBX** (import Unity/Unreal, Substance Painter). |
| `caisse_low.glb` | La low-poly au format **glTF/GLB** (moteurs temps réel, Godot). |
| `caisse_high.blend` | Caisse **high-poly** (arêtes arrondies/usées) : la **source du bake**. |
| `ref_low.png` | Rendu de référence de la low-poly — « ton point de départ ». |
| `ref_high.png` | Rendu de référence de la high-poly — « ce que tu bakes sur la low ». |
| `uv_layout.png` | Le **dépliage UV** de la low-poly (box-map, 6 faces). |
| `generer_caisse.py` | Le script Blender qui a produit le tout (reproductible/modifiable). |

## Caractéristiques

- Échelle réelle : caisse d'environ **1 m**, transforms appliquées (Scale 1, Rotation 0).
- **Low-poly** : ~**816 triangles** (408 sommets), UV dépliées sans chevauchement.
- **High-poly** : ~**53 000 triangles** (bevel + subdivision surface) pour les détails à baker.
- Un seul objet, origine au sol, orienté +Y = avant.

## Comment l'utiliser

**Piste Logiciels · L2 (Substance) — texturing**
Importe `caisse_low.fbx` dans Substance Painter (ou Material Maker / ArmorPaint).
Bake les mesh maps depuis `caisse_high` (ou depuis les rendus si tu compares à l'œil),
puis peins un bois usé. Vise un résultat proche de `ref_low.png`, en plus abîmé.

**Fondamentaux · F8 (baking) & piste Blender · B8 — bake high→low**
Ouvre `caisse_low.blend` et `caisse_high.blend`. Projette la high sur la low
(normal map + AO + curvature). Les **arêtes arrondies** de la high doivent apparaître
sur la low plate : compare avec `ref_high.png`.

**Projet fil rouge · Étape 4 (texturing)**
Sers-toi de cette caisse comme prop du fil rouge si tu n'as pas encore modélisé le tien :
texture-la, exporte, puis importe-la dans ton moteur (étape 6).

## Licence
Créé pour l'Atelier Game Art — **libre d'usage** (y compris commercial), sans attribution.
