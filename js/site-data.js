/* =========================================================================
   SITE_DATA — Manifeste du curriculum (source de vérité unique).
   Pilote : sidebar, navigation préc/suiv, progression, recherche.
   Chargé par <script> sur toutes les pages (aucun fetch — compatible file://).
   ========================================================================= */
window.SITE_DATA = {
  pistes: [
    {
      id: "fondamentaux",
      titre: "Fondamentaux universels",
      kicker: "Piste 0",
      couleur: "var(--piste-fondamentaux)",
      dossier: "cours/fondamentaux/",
      icone: "cube",
      desc: "Les bases indépendantes du moteur : image numérique, couleur, topologie, UV, PBR, baking, animation, optimisation.",
      lecons: [
        { id:"f01", fichier:"f01-image-numerique.html",   titre:"L'image numérique",                niveau:"Débutant",      duree:"35 min", desc:"Pixel, raster vs vectoriel, résolution, profondeur de couleur, alpha, sRGB vs linéaire, gamma.", motscles:["pixel","raster","vectoriel","résolution","profondeur de couleur","8 bits","16 bits","alpha","sRGB","linéaire","gamma","espace colorimétrique"] },
        { id:"f02", fichier:"f02-theorie-artistique.html", titre:"Théorie artistique de base",       niveau:"Débutant",      duree:"30 min", desc:"Couleur (TSV), harmonies, valeur et contraste, composition, lumière et ombre, silhouette.", motscles:["couleur","teinte","saturation","valeur","contraste","composition","silhouette","harmonie","lumière","ombre"] },
        { id:"f03", fichier:"f03-formats-fichiers.html",   titre:"Formats de fichiers",              niveau:"Débutant",      duree:"30 min", desc:"Images (PNG, TGA, JPG, EXR, TIFF, HDR) et 3D (FBX, OBJ, glTF/GLB, USD, Alembic) : quand utiliser quoi.", motscles:["PNG","TGA","JPG","EXR","TIFF","HDR","FBX","OBJ","glTF","GLB","USD","Alembic","format"] },
        { id:"f04", fichier:"f04-anatomie-mesh.html",      titre:"Anatomie d'un modèle 3D",          niveau:"Débutant",      duree:"40 min", desc:"Vertices, edges, faces, tris/quads/n-gons, normales, smoothing groups, topologie et edge flow.", motscles:["vertex","edge","face","tris","quads","n-gons","normales","smoothing","topologie","edge flow","mesh"] },
        { id:"f05", fichier:"f05-pipeline-asset.html",     titre:"Le pipeline de création d'asset",  niveau:"Débutant",      duree:"35 min", desc:"Concept, blockout, high-poly, low-poly, retopologie, UV, baking, texturing, LOD, export, intégration.", motscles:["pipeline","blockout","high-poly","low-poly","retopologie","baking","LOD","workflow","production"] },
        { id:"f06", fichier:"f06-uv-mapping.html",         titre:"UV mapping en profondeur",         niveau:"Intermédiaire", duree:"45 min", desc:"Qu'est-ce qu'un UV, seams, unwrap, packing, texel density, UDIM. Pourquoi un mauvais UV ruine une texture.", motscles:["UV","unwrap","seams","coutures","packing","texel density","densité de texels","UDIM"] },
        { id:"f07", fichier:"f07-pbr.html",                titre:"Le workflow PBR",                  niveau:"Intermédiaire", duree:"55 min", desc:"Metallic/roughness vs specular/glossiness, les maps PBR, conservation de l'énergie, Fresnel.", motscles:["PBR","metallic","roughness","albedo","base color","normal","height","ambient occlusion","emissive","Fresnel","conservation énergie","specular","glossiness"] },
        { id:"f08", fichier:"f08-baking.html",             titre:"Le baking de maps",                niveau:"Intermédiaire", duree:"50 min", desc:"Projeter le high-poly sur le low-poly, normal map (tangent/object space), AO, curvature, cage, artefacts.", motscles:["baking","bake","normal map","tangent space","object space","cage","AO","curvature","projection","artefact"] },
        { id:"f09", fichier:"f09-materiaux-shaders.html",  titre:"Matériaux & shaders",              niveau:"Intermédiaire", duree:"40 min", desc:"Différence matériau/shader/texture, comment un shader calcule un pixel, procédural vs texture-based.", motscles:["matériau","shader","texture","vertex shader","fragment shader","pixel shader","procédural","GPU"] },
        { id:"f10", fichier:"f10-rigging-animation.html",  titre:"Rigging, skinning & animation",    niveau:"Intermédiaire", duree:"45 min", desc:"Squelette, bones, weight painting, IK vs FK, keyframes, courbes, animation squelettale vs blendshapes.", motscles:["rigging","skinning","bones","squelette","weight painting","IK","FK","keyframe","blendshape","morph target","animation"] },
        { id:"f11", fichier:"f11-vfx-particules.html",     titre:"VFX & particules (concepts)",      niveau:"Intermédiaire", duree:"35 min", desc:"Systèmes de particules, sprites vs meshes émis, shaders VFX, flipbooks et atlas d'animation.", motscles:["VFX","particules","sprite","flipbook","atlas","émetteur","billboard","effet"] },
        { id:"f12", fichier:"f12-optimisation.html",       titre:"Optimisation graphique",          niveau:"Avancé",        duree:"50 min", desc:"Budget de polygones, draw calls, LOD, atlasing, compression (BCn, ASTC), mipmaps, overdraw, instancing.", motscles:["optimisation","draw call","budget polygones","LOD","atlas","compression","BCn","DXT","ASTC","mipmap","overdraw","instancing","performance"] }
      ]
    },
    {
      id: "logiciels",
      titre: "Logiciels de création (DCC)",
      kicker: "Piste 1",
      couleur: "var(--piste-logiciels)",
      dossier: "cours/logiciels/",
      icone: "tools",
      desc: "Les outils du game artist : Blender, Substance 3D, logiciels 2D, sculpt, et bibliothèques d'assets.",
      lecons: [
        { id:"l01", fichier:"l01-blender.html",         titre:"Blender",                     niveau:"Débutant",      duree:"55 min", desc:"Installation, interface, navigation, modélisation, sculpt, UV unwrap, matériaux Eevee/Cycles, export FBX/glTF, add-ons.", motscles:["Blender","installation","interface","modélisation","sculpt","UV","Eevee","Cycles","export FBX","glTF","add-on"] },
        { id:"l02", fichier:"l02-substance.html",       titre:"Substance 3D Painter & Designer", niveau:"Intermédiaire", duree:"50 min", desc:"Texturing PBR, smart materials, peinture de textures, export des maps prêtes pour Unity/Unreal.", motscles:["Substance","Painter","Designer","texturing","smart material","peinture","export maps","PBR"] },
        { id:"l03", fichier:"l03-logiciels-2d.html",    titre:"Logiciels 2D (Krita, GIMP, Photoshop)", niveau:"Débutant", duree:"40 min", desc:"Édition de textures, gestion de l'alpha, textures tileable répétables, concept et UI.", motscles:["Krita","GIMP","Photoshop","2D","texture","alpha","tileable","répétable","seamless"] },
        { id:"l04", fichier:"l04-sculpt-zbrush.html",   titre:"Sculpt avancé / ZBrush (panorama)", niveau:"Intermédiaire", duree:"35 min", desc:"Principe du sculpt haute résolution, quand c'est utile, alternative gratuite (mode sculpt de Blender).", motscles:["sculpt","ZBrush","high-poly","dynatopo","multires","brosse","détail"] },
        { id:"l05", fichier:"l05-bibliotheques-assets.html", titre:"Bibliothèques d'assets & scans", niveau:"Débutant",  duree:"30 min", desc:"Fab (marketplace Epic), Poly Haven, import, et lecture des licences.", motscles:["Fab","Poly Haven","Megascans","scan","HDRI","licence","marketplace","asset gratuit"] }
      ]
    },
    {
      id: "blender",
      titre: "Blender (3D complet)",
      kicker: "Piste 2",
      couleur: "var(--piste-blender)",
      dossier: "cours/blender/",
      icone: "blender",
      desc: "De A à Z dans Blender (5.0 / 4.5 LTS) : interface, modélisation, modifiers, sculpt, UV, shading, baking, Geometry Nodes, animation et export vers les moteurs.",
      lecons: [
        { id:"b01", fichier:"b01-installation.html",   titre:"Installation & configuration",          niveau:"Débutant",      duree:"30 min", desc:"Télécharger Blender (5.0 ou 4.5 LTS), versions, préférences, GPU de rendu, unités, activation d'add-ons.", motscles:["Blender installation","blender.org","LTS","5.0","4.5 LTS","préférences","GPU","add-on","unités"] },
        { id:"b02", fichier:"b02-interface.html",       titre:"Interface & navigation",                niveau:"Débutant",      duree:"40 min", desc:"Workspaces, éditeurs, 3D Viewport, Outliner, Properties, navigation, curseur 3D, pivots, raccourcis.", motscles:["interface Blender","workspace","viewport","Outliner","Properties","navigation","curseur 3D","raccourci"] },
        { id:"b03", fichier:"b03-modelisation.html",    titre:"Modélisation (Edit Mode)",              niveau:"Intermédiaire", duree:"50 min", desc:"Edit Mode, extrude, inset, bevel, loop cut, knife, snapping et bonnes pratiques de topologie.", motscles:["modélisation Blender","Edit Mode","extrude","inset","bevel","loop cut","knife","snapping","topologie"] },
        { id:"b04", fichier:"b04-modifiers.html",       titre:"Les modifiers (non destructif)",        niveau:"Intermédiaire", duree:"45 min", desc:"Mirror, Subdivision Surface, Solidify, Boolean, Array, Bevel, Shrinkwrap : la pile non destructive.", motscles:["modifier Blender","Mirror","Subdivision Surface","Solidify","Boolean","Array","Bevel","non destructif"] },
        { id:"b05", fichier:"b05-sculpt-retopo.html",   titre:"Sculpt & retopologie",                  niveau:"Avancé",        duree:"45 min", desc:"Mode Sculpt (Dyntopo, Multires, remesh, brosses) et retopologie propre par-dessus le high-poly.", motscles:["sculpt Blender","Dyntopo","Multiresolution","remesh","brosse","retopologie","shrinkwrap"] },
        { id:"b06", fichier:"b06-uv.html",              titre:"UV unwrap dans Blender",                niveau:"Intermédiaire", duree:"45 min", desc:"Mark Seam, Unwrap, Smart UV Project, UV Editor, packing, vérification au damier, texel density.", motscles:["UV Blender","Mark Seam","Unwrap","Smart UV","UV Editor","packing","damier","texel density"] },
        { id:"b07", fichier:"b07-shading.html",         titre:"Shading & matériaux (nodes)",           niveau:"Intermédiaire", duree:"50 min", desc:"Shader Editor, Principled BSDF, brancher ses maps PBR, Color Space Non-Color, node groups, EEVEE vs Cycles.", motscles:["shading Blender","Shader Editor","Principled BSDF","PBR","Non-Color","node group","EEVEE","Cycles"] },
        { id:"b08", fichier:"b08-texture-paint-bake.html", titre:"Texture Paint & Baking",            niveau:"Avancé",        duree:"50 min", desc:"Peindre des textures sur le mesh et baker (normal, AO, combined) du high-poly vers le low-poly dans Blender.", motscles:["texture paint","baking Blender","bake","normal map","AO","cage","Cycles bake","selected to active"] },
        { id:"b09", fichier:"b09-geometry-nodes.html",  titre:"Geometry Nodes (procédural)",           niveau:"Avancé",        duree:"50 min", desc:"Modélisation et scatter procéduraux par nœuds : bases, instances, distribution, paramètres exposés.", motscles:["Geometry Nodes","procédural","instances","scatter","distribute points","champ","field","node procédural"] },
        { id:"b10", fichier:"b10-rigging-animation.html", titre:"Rigging, skinning & animation",       niveau:"Avancé",        duree:"50 min", desc:"Armature, bones, weight paint, IK/FK, keyframes, Dope Sheet/Graph Editor, contraintes de base.", motscles:["rigging Blender","armature","bone","weight paint","IK","FK","keyframe","Dope Sheet","Graph Editor"] },
        { id:"b11", fichier:"b11-rendu-export.html",    titre:"Rendu & export vers les moteurs",       niveau:"Intermédiaire", duree:"40 min", desc:"Réglages de rendu EEVEE/Cycles, éclairage et caméra, puis export FBX/glTF propre (échelle, axes) vers Unity/Unreal.", motscles:["rendu Blender","EEVEE","Cycles","caméra","export FBX","glTF","échelle","axes","apply transform"] }
      ]
    },
    {
      id: "unity",
      titre: "Unity",
      kicker: "Piste 3",
      couleur: "var(--piste-unity)",
      dossier: "cours/unity/",
      icone: "unity",
      desc: "De A à Z dans Unity 6.3 LTS, focus graphisme : pipelines, matériaux, éclairage, post-process, VFX, optimisation.",
      lecons: [
        { id:"u01", fichier:"u01-installation.html",     titre:"Installation & configuration",     niveau:"Débutant",      duree:"30 min", desc:"Unity Hub, Unity 6.3 LTS, modules build support, compte, licence Personal gratuite.", motscles:["Unity Hub","installation","Unity 6.3","LTS","licence Personal","module","build support"] },
        { id:"u02", fichier:"u02-editeur.html",          titre:"Anatomie de l'éditeur Unity",      niveau:"Débutant",      duree:"35 min", desc:"Scene, Game, Hierarchy, Inspector, Project, Console ; navigation ; modèle GameObject + Components.", motscles:["éditeur Unity","Scene","Game","Hierarchy","Inspector","Project","Console","GameObject","Component"] },
        { id:"u03", fichier:"u03-render-pipelines.html", titre:"Render pipelines (URP / HDRP)",    niveau:"Intermédiaire", duree:"45 min", desc:"Built-in vs URP vs HDRP : différences, public visé, lequel choisir, créer un projet avec chacun.", motscles:["URP","HDRP","Built-in","render pipeline","SRP","scriptable render pipeline"] },
        { id:"u04", fichier:"u04-projet-graphique.html", titre:"Créer & configurer un projet",     niveau:"Débutant",      duree:"30 min", desc:"Templates, color space linéaire, réglages de qualité, organisation des dossiers.", motscles:["projet Unity","template","color space","linéaire","quality settings","organisation dossiers"] },
        { id:"u05", fichier:"u05-import-assets.html",    titre:"Import d'assets",                  niveau:"Intermédiaire", duree:"45 min", desc:"Import FBX (scale factor, normales, tangents, rig), import textures (type, compression, sRGB, mipmaps).", motscles:["import","FBX","scale factor","normales","tangents","texture import","compression","sRGB","mipmap"] },
        { id:"u06", fichier:"u06-materiaux.html",        titre:"Matériaux & Shader Graph",         niveau:"Intermédiaire", duree:"50 min", desc:"Standard / URP Lit / HDRP Lit, brancher ses maps PBR, transparence, émission, intro Shader Graph.", motscles:["matériau Unity","URP Lit","HDRP Lit","Standard","Shader Graph","émission","transparence","PBR"] },
        { id:"u07", fichier:"u07-eclairage.html",        titre:"Éclairage",                        niveau:"Avancé",        duree:"55 min", desc:"Types de lumières, temps réel vs baked, GI, lightmapping (UV2), Light Probes, Reflection Probes, skybox.", motscles:["éclairage Unity","lightmapping","UV2","Light Probe","Reflection Probe","Global Illumination","baked","skybox"] },
        { id:"u08", fichier:"u08-post-processing.html",  titre:"Post-processing (Volume)",         niveau:"Intermédiaire", duree:"35 min", desc:"Framework Volume, bloom, tonemapping, color grading, AO, profondeur de champ, vignette.", motscles:["post-processing","Volume","bloom","tonemapping","color grading","ambient occlusion","vignette","depth of field"] },
        { id:"u09", fichier:"u09-vfx.html",              titre:"Particules & VFX",                 niveau:"Intermédiaire", duree:"40 min", desc:"Particle System (Shuriken) et VFX Graph (GPU) ; construire un effet simple.", motscles:["Particle System","Shuriken","VFX Graph","GPU","effet","émetteur","particule Unity"] },
        { id:"u10", fichier:"u10-plugins-packages.html", titre:"Plugins & packages",               niveau:"Débutant",      duree:"30 min", desc:"Package Manager, registres, Git URL, Asset Store, installation/désinstallation, dépendances.", motscles:["Package Manager","package","Git URL","Asset Store","registre","dépendance","plugin Unity"] },
        { id:"u11", fichier:"u11-optimisation.html",     titre:"Optimisation graphique Unity",     niveau:"Avancé",        duree:"50 min", desc:"Static/dynamic batching, GPU instancing, occlusion culling, LOD Group, atlas, Profiler, Frame Debugger.", motscles:["optimisation Unity","batching","GPU instancing","occlusion culling","LOD Group","Profiler","Frame Debugger"] }
      ]
    },
    {
      id: "unreal",
      titre: "Unreal Engine",
      kicker: "Piste 4",
      couleur: "var(--piste-unreal)",
      dossier: "cours/unreal/",
      icone: "unreal",
      desc: "De A à Z dans Unreal Engine 5.7, focus graphisme : matériaux à nœuds, Lumen, Nanite, Niagara, optimisation.",
      lecons: [
        { id:"e01", fichier:"e01-installation.html",   titre:"Installation & configuration",   niveau:"Débutant",      duree:"30 min", desc:"Epic Games Launcher, Unreal Engine 5.7, note sur UE6, modèle de royalties d'Epic.", motscles:["Epic Games Launcher","Unreal Engine 5.7","UE5","UE6","installation","royalties","royautés"] },
        { id:"e02", fichier:"e02-editeur.html",        titre:"Anatomie de l'éditeur Unreal",   niveau:"Débutant",      duree:"35 min", desc:"Viewport, Outliner, Details, Content Browser, modes, navigation.", motscles:["éditeur Unreal","Viewport","Outliner","Details","Content Browser","mode","navigation"] },
        { id:"e03", fichier:"e03-projet.html",         titre:"Créer & configurer un projet",   niveau:"Débutant",      duree:"30 min", desc:"Templates (Blank, Third Person), réglages de Scalability/qualité, structure du dossier Content.", motscles:["projet Unreal","template","Blank","Third Person","Scalability","Content","structure"] },
        { id:"e04", fichier:"e04-import-assets.html",  titre:"Import d'assets",                niveau:"Intermédiaire", duree:"45 min", desc:"Import FBX/glTF, collision, LOD, matériaux, Nanite à l'import, textures, Virtual Textures.", motscles:["import Unreal","FBX","glTF","collision","LOD","Nanite import","Virtual Texture","texture"] },
        { id:"e05", fichier:"e05-material-editor.html", titre:"Le Material Editor",            niveau:"Avancé",        duree:"60 min", desc:"Système de nœuds, Master Material + Material Instances, brancher ses maps PBR, Material Functions.", motscles:["Material Editor","nœud","Master Material","Material Instance","Material Function","PBR Unreal","node"] },
        { id:"e06", fichier:"e06-eclairage.html",      titre:"Éclairage (Lumen)",              niveau:"Avancé",        duree:"55 min", desc:"Lumen (GI et réflexions temps réel), lumières, Virtual Shadow Maps, Lightmass, exposition, Post Process Volume.", motscles:["Lumen","éclairage Unreal","Virtual Shadow Maps","Lightmass","Global Illumination","exposition","Post Process Volume"] },
        { id:"e07", fichier:"e07-nanite.html",         titre:"Nanite (géométrie virtualisée)", niveau:"Avancé",        duree:"40 min", desc:"Ce que c'est, quand l'activer, ses limites.", motscles:["Nanite","géométrie virtualisée","cluster","high-poly","virtualized geometry","limites"] },
        { id:"e08", fichier:"e08-niagara.html",        titre:"Niagara (VFX)",                  niveau:"Intermédiaire", duree:"45 min", desc:"Systèmes, émetteurs, modules ; construire un effet de base.", motscles:["Niagara","VFX Unreal","système","émetteur","module","effet","particule Unreal"] },
        { id:"e09", fichier:"e09-plugins.html",        titre:"Plugins (Fab, Quixel Bridge)",   niveau:"Débutant",      duree:"30 min", desc:"Activer/désactiver des plugins, marketplace Fab, Quixel Bridge (MetaHuman), installer un plugin tiers.", motscles:["plugin Unreal","Fab","Quixel Bridge","MetaHuman","marketplace","installation plugin"] },
        { id:"e10", fichier:"e10-optimisation.html",   titre:"Optimisation graphique Unreal",  niveau:"Avancé",        duree:"50 min", desc:"LOD vs Nanite, scalabilité de Lumen, profiling (Stat, GPU Visualizer), réglages de Scalability.", motscles:["optimisation Unreal","LOD","Nanite","Lumen","Stat","GPU Visualizer","Scalability","profiling"] }
      ]
    },
    {
      id: "godot",
      titre: "Godot Engine",
      kicker: "Piste 5",
      couleur: "var(--piste-godot)",
      dossier: "cours/godot/",
      icone: "godot",
      desc: "De A à Z dans Godot 4.x (libre, MIT) : nodes & scènes, renderers, import, matériaux, éclairage (SDFGI), environnement, particules, plugins et optimisation.",
      lecons: [
        { id:"g01", fichier:"g01-installation.html",  titre:"Installation & configuration",          niveau:"Débutant",      duree:"30 min", desc:"Télécharger Godot 4.x sur godotengine.org, version standard vs .NET (C#), éditeur portable, licence MIT gratuite sans royalties.", motscles:["Godot installation","godotengine.org","4.x","MIT","gratuit","sans royalties","standard","C#","portable"] },
        { id:"g02", fichier:"g02-editeur.html",        titre:"Anatomie de l'éditeur Godot",          niveau:"Débutant",      duree:"35 min", desc:"Modèle Scene + Node, arbre de scène, Inspector, dock FileSystem, viewport, docks et navigation.", motscles:["éditeur Godot","Node","Scene","arbre de scène","Inspector","FileSystem","viewport","node"] },
        { id:"g03", fichier:"g03-renderers.html",      titre:"Renderers (Forward+ / Mobile / Compatibility)", niveau:"Intermédiaire", duree:"40 min", desc:"Les trois backends de rendu de Godot 4 (Vulkan/OpenGL), public visé, lequel choisir et conséquences.", motscles:["renderer Godot","Forward+","Mobile","Compatibility","Vulkan","OpenGL","backend rendu"] },
        { id:"g04", fichier:"g04-projet.html",         titre:"Créer & configurer un projet",          niveau:"Débutant",      duree:"30 min", desc:"Project Manager, Project Settings (rendering), structure du projet, dossier .godot, organisation et versioning.", motscles:["projet Godot","Project Manager","Project Settings","rendering","organisation","res://",".godot"] },
        { id:"g05", fichier:"g05-import-assets.html",  titre:"Import d'assets",                       niveau:"Intermédiaire", duree:"45 min", desc:"glTF recommandé, dock Import, scènes importées, réimport, réglages de textures et compression VRAM.", motscles:["import Godot","glTF","import dock","scène importée","réimport","texture","compression VRAM"] },
        { id:"g06", fichier:"g06-materiaux.html",      titre:"Matériaux & shaders",                   niveau:"Intermédiaire", duree:"50 min", desc:"StandardMaterial3D/ORM, brancher ses maps PBR, transparence, émission ; intro au langage de shader Godot et au VisualShader.", motscles:["StandardMaterial3D","ORMMaterial","PBR Godot","shader Godot","VisualShader","émission","transparence"] },
        { id:"g07", fichier:"g07-eclairage.html",      titre:"Éclairage (SDFGI & GI)",                niveau:"Avancé",        duree:"55 min", desc:"Lumières, temps réel vs baked, SDFGI (GI dynamique), VoxelGI, LightmapGI, WorldEnvironment et ciel.", motscles:["éclairage Godot","SDFGI","VoxelGI","LightmapGI","DirectionalLight3D","Global Illumination","WorldEnvironment","sky"] },
        { id:"g08", fichier:"g08-environnement.html",  titre:"Environnement & post-processing",       niveau:"Intermédiaire", duree:"35 min", desc:"WorldEnvironment : tonemap, glow/bloom, SSAO, SSR, SSIL, fog volumétrique, adjustments.", motscles:["WorldEnvironment","post-processing Godot","tonemap","glow","bloom","SSAO","SSR","SSIL","fog"] },
        { id:"g09", fichier:"g09-vfx.html",            titre:"Particules & VFX",                      niveau:"Intermédiaire", duree:"40 min", desc:"GPUParticles3D vs CPUParticles3D, ProcessMaterial, draw passes, sous-émetteurs ; construire un effet simple.", motscles:["GPUParticles3D","CPUParticles3D","ProcessMaterial","VFX Godot","particule","draw pass","émetteur"] },
        { id:"g10", fichier:"g10-plugins.html",        titre:"Plugins & AssetLib",                    niveau:"Débutant",      duree:"30 min", desc:"L'Asset Library (AssetLib) intégrée, dossier addons, plugin.cfg, activer/désactiver des plugins d'éditeur.", motscles:["plugin Godot","AssetLib","Asset Library","addons","plugin.cfg","extension Godot"] },
        { id:"g11", fichier:"g11-optimisation.html",   titre:"Optimisation graphique Godot",          niveau:"Avancé",        duree:"50 min", desc:"MultiMesh/instancing, visibility ranges (LOD), occlusion culling, mesh LOD auto, monitors et débogueur de performances.", motscles:["optimisation Godot","MultiMesh","instancing","visibility range","LOD","occlusion culling","monitor","profiler Godot"] }
      ]
    },
    {
      id: "comparaison",
      titre: "Comparaison & ponts",
      kicker: "Piste 6",
      couleur: "var(--piste-comparaison)",
      dossier: "cours/comparaison/",
      icone: "bridge",
      desc: "Choisir et faire dialoguer les moteurs : comparatif Unity/Unreal, transfert d'assets, choix du moteur.",
      lecons: [
        { id:"c01", fichier:"c01-unity-vs-unreal.html", titre:"Unity vs Unreal pour le graphisme", niveau:"Intermédiaire", duree:"35 min", desc:"Tableau comparatif : rendu, matériaux, éclairage, VFX, workflow, coût/licence, public visé.", motscles:["Unity vs Unreal","comparaison","rendu","licence","coût","workflow","choix moteur"] },
        { id:"c02", fichier:"c02-transfert-assets.html", titre:"Transférer des assets entre moteurs", niveau:"Intermédiaire", duree:"35 min", desc:"Conventions d'échelle et d'axes, formats, pièges fréquents depuis Blender vers Unity/Unreal.", motscles:["transfert asset","échelle","axes","unité","FBX","Blender","convention","pipeline inter-moteur"] },
        { id:"c03", fichier:"c03-choisir-moteur.html",  titre:"Choisir son moteur",                niveau:"Débutant",      duree:"25 min", desc:"Selon le type de projet et son profil : critères de décision concrets.", motscles:["choisir moteur","décision","projet","profil","critère","Unity ou Unreal"] }
      ]
    },
    {
      id: "csharp",
      titre: "Programmation C# (Unity)",
      kicker: "Piste 7",
      couleur: "var(--piste-csharp)",
      dossier: "cours/csharp/",
      icone: "code",
      desc: "Apprendre le C# dans le contexte de Unity : du premier script aux concepts avancés (variables, POO, collections, cycle MonoBehaviour, events, coroutines, bonnes pratiques).",
      lecons: [
        { id:"cs01", fichier:"cs01-introduction.html",          titre:"Introduction au C# & premier script", niveau:"Débutant",      duree:"35 min", desc:"Qu'est-ce qu'un script, MonoBehaviour, créer et attacher un script, l'éditeur de code, le cycle compiler/jouer.", motscles:["C#","script","MonoBehaviour","Unity","Visual Studio","compiler","Debug.Log","premier script"] },
        { id:"cs02", fichier:"cs02-variables-types.html",       titre:"Variables & types",                   niveau:"Débutant",      duree:"35 min", desc:"int, float, bool, string, var ; déclaration, affectation, [SerializeField] et exposition dans l'Inspector.", motscles:["variable","type","int","float","bool","string","var","SerializeField","Inspector","public"] },
        { id:"cs03", fichier:"cs03-operateurs.html",            titre:"Opérateurs & expressions",            niveau:"Débutant",      duree:"30 min", desc:"Arithmétique, comparaison, logique, affectation composée, conversions et casts entre types.", motscles:["opérateur","arithmétique","comparaison","logique","cast","conversion","expression","modulo"] },
        { id:"cs04", fichier:"cs04-conditions.html",            titre:"Conditions (if, switch)",             niveau:"Débutant",      duree:"35 min", desc:"if / else if / else, opérateur ternaire, switch, et erreurs classiques (== vs =).", motscles:["if","else","switch","condition","ternaire","booléen","branchement"] },
        { id:"cs05", fichier:"cs05-boucles.html",               titre:"Boucles (for, while, foreach)",       niveau:"Débutant",      duree:"35 min", desc:"for, while, do-while, foreach, break/continue, et pourquoi éviter les boucles infinies en jeu.", motscles:["boucle","for","while","foreach","do-while","break","continue","itération"] },
        { id:"cs06", fichier:"cs06-methodes.html",              titre:"Méthodes (fonctions)",                niveau:"Intermédiaire", duree:"40 min", desc:"Déclarer une méthode, paramètres, valeur de retour, surcharge, portée, et découper son code.", motscles:["méthode","fonction","paramètre","return","surcharge","void","portée","scope"] },
        { id:"cs07", fichier:"cs07-monobehaviour.html",         titre:"Le cycle de vie MonoBehaviour",       niveau:"Intermédiaire", duree:"45 min", desc:"Awake, Start, Update, FixedUpdate, LateUpdate, OnEnable/Disable ; Time.deltaTime et l'ordre d'exécution.", motscles:["MonoBehaviour","Awake","Start","Update","FixedUpdate","LateUpdate","deltaTime","cycle de vie"] },
        { id:"cs08", fichier:"cs08-classes-poo.html",           titre:"Classes & objets (POO)",              niveau:"Intermédiaire", duree:"45 min", desc:"class, champs, méthodes, constructeurs, encapsulation (public/private), propriétés, instances vs static.", motscles:["classe","objet","POO","constructeur","encapsulation","propriété","static","instance"] },
        { id:"cs09", fichier:"cs09-heritage-interfaces.html",   titre:"Héritage, interfaces & polymorphisme",niveau:"Avancé",        duree:"45 min", desc:"Héritage, base, virtual/override/abstract, interfaces, polymorphisme — et leur usage en jeu.", motscles:["héritage","interface","polymorphisme","virtual","override","abstract","base","IDamageable"] },
        { id:"cs10", fichier:"cs10-collections.html",           titre:"Collections (List, Dictionary, tableaux)", niveau:"Intermédiaire", duree:"40 min", desc:"Tableaux, List<T>, Dictionary<K,V>, parcours avec foreach, ajouter/retirer, et choix de la bonne collection.", motscles:["collection","tableau","array","List","Dictionary","générique","foreach","index"] },
        { id:"cs11", fichier:"cs11-gameobjects-components.html",titre:"Manipuler GameObjects & Components",  niveau:"Intermédiaire", duree:"45 min", desc:"GetComponent, transform, Instantiate, Destroy, tags et layers, références dans l'Inspector vs Find.", motscles:["GameObject","Component","GetComponent","Instantiate","Destroy","transform","tag","référence"] },
        { id:"cs12", fichier:"cs12-entrees-mouvement.html",     titre:"Entrées & mouvement",                 niveau:"Intermédiaire", duree:"45 min", desc:"Lire le clavier/souris (Input System), déplacer un objet, Translate vs Rigidbody, deltaTime et physique.", motscles:["Input","clavier","souris","mouvement","Translate","Rigidbody","velocity","deltaTime"] },
        { id:"cs13", fichier:"cs13-evenements.html",            titre:"Événements & communication",          niveau:"Avancé",        duree:"45 min", desc:"delegates, Action, events C#, UnityEvent ; communiquer entre scripts sans tout coupler.", motscles:["event","delegate","Action","UnityEvent","communication","découplage","observateur","callback"] },
        { id:"cs14", fichier:"cs14-coroutines.html",            titre:"Coroutines & gestion du temps",       niveau:"Avancé",        duree:"40 min", desc:"IEnumerator, yield, WaitForSeconds, StartCoroutine, Invoke ; étaler une action dans le temps.", motscles:["coroutine","IEnumerator","yield","WaitForSeconds","StartCoroutine","Invoke","temps","async"] },
        { id:"cs15", fichier:"cs15-bonnes-pratiques.html",      titre:"Bonnes pratiques, perfs & organisation",niveau:"Avancé",        duree:"45 min", desc:"Null checks, cache de références, éviter GetComponent dans Update, ScriptableObjects, débogage et structure du code.", motscles:["bonnes pratiques","performance","null","cache","ScriptableObject","debug","Garbage Collection","organisation"] }
      ]
    }
  ]
};

/* --- Aplatissement utilitaire : ordre global des leçons pour préc/suiv --- */
(function () {
  var flat = [];
  window.SITE_DATA.pistes.forEach(function (p) {
    p.lecons.forEach(function (l) {
      flat.push({
        id: l.id,
        titre: l.titre,
        niveau: l.niveau,
        duree: l.duree,
        desc: l.desc,
        motscles: l.motscles || [],
        href: p.dossier + l.fichier,
        pisteId: p.id,
        pisteTitre: p.titre,
        pisteKicker: p.kicker,
        pisteCouleur: p.couleur
      });
    });
  });
  window.SITE_DATA.flat = flat;
  window.SITE_DATA.byId = function (id) {
    for (var i = 0; i < flat.length; i++) if (flat[i].id === id) return flat[i];
    return null;
  };
  window.SITE_DATA.totalLecons = flat.length;
})();
