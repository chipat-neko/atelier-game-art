/* =========================================================================
   SITE_DATA — Manifeste du curriculum (source de vérité unique).
   Pilote : sidebar, navigation préc/suiv, progression, recherche.
   Chargé par <script> sur toutes les pages (aucun fetch — compatible file://).
   ========================================================================= */
window.SITE_DATA = {
  pistes: [
    {
      id: "logiciels",
      titre: "Logiciels de création (DCC)",
      kicker: "Piste 0",
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
      id: "fondamentaux",
      titre: "Fondamentaux universels",
      kicker: "Piste 1",
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
      id: "blender",
      titre: "Blender (3D complet)",
      kicker: "Piste 2",
      couleur: "var(--piste-blender)",
      dossier: "cours/blender/",
      icone: "blender",
      desc: "De A à Z dans Blender (5.0 / 4.5 LTS) : interface, modélisation, modifiers, sculpt, UV, shading, baking, Geometry Nodes, animation et export vers les moteurs.",
      lecons: [
        { id:"b01", fichier:"b01-installation.html",   titre:"Installation & configuration",          niveau:"Débutant",      duree:"30 min", desc:"Télécharger Blender (5.0 ou 4.5 LTS), versions, préférences, GPU de rendu, unités, activation d'add-ons.", motscles:["Blender installation","blender.org","LTS","5.0","4.5 LTS","préférences","GPU","add-on","unités"] },
        { id:"b1b", fichier:"b01b-guide-interface.html", titre:"Guide complet de l'interface",         niveau:"Débutant",      duree:"45 min", desc:"Référence visuelle : chaque menu de Blender (File, Edit, Render, Window, Help, View, Select, Add, Object, et Edit Mode) détaillé item par item, captures à l'appui.", motscles:["interface Blender","menus","File","Edit","Render","Window","Help","View","Select","Add","Object","Mesh","Vertex","Edge","Face","référence","raccourcis"] },
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
        { id:"g2b", fichier:"g02b-guide-interface.html", titre:"Guide complet de l'interface",        niveau:"Débutant",      duree:"40 min", desc:"Référence visuelle : chaque menu de Godot (Scene, Project, Debug, Editor, Help), les onglets, la barre d'outils 3D, les docks et les panneaux du bas, détaillés item par item, captures à l'appui.", motscles:["interface Godot","menus","Scene","Project","Debug","Editor","Help","onglets","barre d'outils","docks","Inspector","FileSystem","référence","raccourcis"] },
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
    },
    {
      id: "cpp",
      titre: "Programmation C++ (Unreal)",
      kicker: "Piste 8",
      couleur: "var(--piste-cpp)",
      dossier: "cours/cpp/",
      icone: "terminal",
      desc: "Apprendre le C++ dans le contexte d'Unreal Engine : du premier Actor aux concepts avancés (types, mémoire, POO, système de réflexion UCLASS/UPROPERTY, gameplay framework, delegates, exposition Blueprint, bonnes pratiques).",
      lecons: [
        { id:"cpp01", fichier:"cpp01-introduction.html",        titre:"Introduction au C++ & Unreal",          niveau:"Débutant",      duree:"40 min", desc:"Pourquoi le C++ dans Unreal, C++ vs Blueprint, créer une classe C++, compiler & Live Coding, structure d'un module.", motscles:["C++","Unreal","Blueprint","compiler","Live Coding","UCLASS","module","premier projet"] },
        { id:"cpp02", fichier:"cpp02-variables-types.html",     titre:"Variables, types & mémoire",            niveau:"Débutant",      duree:"40 min", desc:"int32, float, bool, FString ; types Unreal vs standards, stack vs heap, const, auto, déclaration et initialisation.", motscles:["variable","type","int32","float","bool","FString","stack","heap","const","auto"] },
        { id:"cpp03", fichier:"cpp03-operateurs.html",          titre:"Opérateurs & expressions",              niveau:"Débutant",      duree:"30 min", desc:"Arithmétique, comparaison, logique, affectation composée, incrément, et conversions entre types.", motscles:["opérateur","arithmétique","comparaison","logique","cast","conversion","modulo","incrément"] },
        { id:"cpp04", fichier:"cpp04-conditions.html",          titre:"Conditions (if, switch)",               niveau:"Débutant",      duree:"35 min", desc:"if / else if / else, opérateur ternaire, switch, et erreurs classiques (= vs ==).", motscles:["if","else","switch","condition","ternaire","booléen","branchement"] },
        { id:"cpp05", fichier:"cpp05-boucles.html",             titre:"Boucles (for, while, range-based)",     niveau:"Débutant",      duree:"35 min", desc:"for, while, do-while, range-based for, break/continue, et pourquoi éviter les boucles bloquantes par frame.", motscles:["boucle","for","while","do-while","range-based","break","continue","itération"] },
        { id:"cpp06", fichier:"cpp06-fonctions.html",           titre:"Fonctions & en-têtes (.h / .cpp)",      niveau:"Intermédiaire", duree:"45 min", desc:"Déclarer/définir une fonction, paramètres par valeur/référence, const, valeur de retour, et séparation header/source.", motscles:["fonction","header",".h",".cpp","paramètre","référence","const","return","déclaration","définition"] },
        { id:"cpp07", fichier:"cpp07-classes-poo.html",         titre:"Classes & POO en C++",                  niveau:"Intermédiaire", duree:"45 min", desc:"class, membres, constructeur/destructeur, encapsulation (public/private), héritage, virtual/override, polymorphisme.", motscles:["classe","objet","POO","constructeur","destructeur","encapsulation","héritage","virtual","override","polymorphisme"] },
        { id:"cpp08", fichier:"cpp08-reflexion-unreal.html",    titre:"Le système de réflexion Unreal",        niveau:"Intermédiaire", duree:"45 min", desc:"UCLASS, UPROPERTY, UFUNCTION, GENERATED_BODY, UENUM/USTRUCT : ce que la réflexion apporte (éditeur, GC, Blueprint, sérialisation).", motscles:["réflexion","UCLASS","UPROPERTY","UFUNCTION","GENERATED_BODY","UENUM","USTRUCT","macro","UHT"] },
        { id:"cpp09", fichier:"cpp09-actors-components.html",   titre:"Actors, Components & cycle de vie",     niveau:"Intermédiaire", duree:"45 min", desc:"AActor, UActorComponent, CreateDefaultSubobject, hiérarchie, BeginPlay/Tick/EndPlay, SpawnActor et Destroy.", motscles:["AActor","Component","CreateDefaultSubobject","BeginPlay","Tick","EndPlay","SpawnActor","RootComponent"] },
        { id:"cpp10", fichier:"cpp10-pointeurs-memoire.html",   titre:"Pointeurs & mémoire (GC Unreal)",       niveau:"Avancé",        duree:"45 min", desc:"Pointeurs et références, le ramasse-miettes d'Unreal, UPROPERTY() & TObjectPtr, TWeakObjectPtr, IsValid, smart pointers C++.", motscles:["pointeur","référence","Garbage Collection","UPROPERTY","TObjectPtr","TWeakObjectPtr","IsValid","nullptr","smart pointer"] },
        { id:"cpp11", fichier:"cpp11-conteneurs.html",          titre:"Conteneurs Unreal (TArray, TMap…)",     niveau:"Intermédiaire", duree:"40 min", desc:"TArray, TMap, TSet, et FString/FName/FText ; parcourir avec range-based for, ajouter/retirer, et bien choisir.", motscles:["TArray","TMap","TSet","FString","FName","FText","conteneur","container","itération"] },
        { id:"cpp12", fichier:"cpp12-gameplay-entrees.html",    titre:"Gameplay framework & entrées",          niveau:"Avancé",        duree:"45 min", desc:"GameMode, Pawn/Character, PlayerController, et lire les entrées avec Enhanced Input pour déplacer un personnage.", motscles:["GameMode","Pawn","Character","PlayerController","Enhanced Input","Input Action","mouvement","gameplay"] },
        { id:"cpp13", fichier:"cpp13-delegates.html",           titre:"Delegates & événements",                niveau:"Avancé",        duree:"45 min", desc:"Delegates simples et multicast, DECLARE_DYNAMIC_MULTICAST_DELEGATE, Broadcast/AddDynamic, BlueprintAssignable, interfaces.", motscles:["delegate","multicast","événement","Broadcast","AddDynamic","BlueprintAssignable","interface","découplage"] },
        { id:"cpp14", fichier:"cpp14-blueprint-timers.html",    titre:"Exposer au Blueprint & timers",         niveau:"Avancé",        duree:"45 min", desc:"BlueprintCallable, BlueprintImplementableEvent/Native, EditAnywhere, et FTimerManager pour différer/répéter une action.", motscles:["BlueprintCallable","BlueprintImplementableEvent","EditAnywhere","FTimerManager","SetTimer","Timer","exposition"] },
        { id:"cpp15", fichier:"cpp15-bonnes-pratiques.html",    titre:"Bonnes pratiques, perfs & organisation",niveau:"Avancé",        duree:"50 min", desc:"Tick maîtrisé, IsValid, forward declarations, includes, conventions Unreal, débogage (UE_LOG) et mini-projet récapitulatif.", motscles:["bonnes pratiques","performance","Tick","IsValid","forward declaration","include","UE_LOG","convention","organisation"] }
      ]
    },
    {
      id: "gdscript",
      titre: "Programmation GDScript (Godot)",
      kicker: "Piste 9",
      couleur: "var(--piste-gdscript)",
      dossier: "cours/gdscript/",
      icone: "braces",
      desc: "Apprendre le GDScript dans le contexte de Godot : du premier script attaché à un node aux concepts avancés (variables, POO, cycle des nodes, scènes, signaux, collections, entrées, ressources, await, bonnes pratiques).",
      lecons: [
        { id:"gd01", fichier:"gd01-introduction.html",        titre:"Introduction à GDScript & premier script", niveau:"Débutant",      duree:"35 min", desc:"Qu'est-ce que GDScript, attacher un script à un node, _ready, print, l'éditeur Godot et le cycle éditer/jouer.", motscles:["GDScript","Godot","script","node","_ready","print","extends","premier script"] },
        { id:"gd02", fichier:"gd02-variables-types.html",     titre:"Variables & types",                   niveau:"Débutant",      duree:"35 min", desc:"var, const, int, float, bool, String ; typage statique optionnel (var x: int), inférence et @export.", motscles:["variable","type","var","const","int","float","bool","String","typage","export"] },
        { id:"gd03", fichier:"gd03-operateurs.html",          titre:"Opérateurs & expressions",            niveau:"Débutant",      duree:"30 min", desc:"Arithmétique, comparaison, logique (and/or/not), affectation composée et conversions de types.", motscles:["opérateur","arithmétique","comparaison","logique","and","or","not","conversion","modulo"] },
        { id:"gd04", fichier:"gd04-conditions.html",          titre:"Conditions (if, match)",              niveau:"Débutant",      duree:"35 min", desc:"if / elif / else, l'indentation, opérateur ternaire, et match (l'équivalent puissant du switch).", motscles:["if","elif","else","match","condition","ternaire","indentation","branchement"] },
        { id:"gd05", fichier:"gd05-boucles.html",             titre:"Boucles (for, while, range)",         niveau:"Débutant",      duree:"35 min", desc:"for avec range, parcourir un tableau, while, break/continue, et éviter les boucles bloquantes par frame.", motscles:["boucle","for","while","range","break","continue","itération","tableau"] },
        { id:"gd06", fichier:"gd06-fonctions.html",           titre:"Fonctions (func)",                    niveau:"Intermédiaire", duree:"40 min", desc:"Déclarer une fonction avec func, paramètres, valeurs par défaut, return, typage et découper son code.", motscles:["fonction","func","paramètre","return","typage","valeur par défaut","portée"] },
        { id:"gd07", fichier:"gd07-cycle-node.html",          titre:"Le cycle de vie des nodes",           niveau:"Intermédiaire", duree:"45 min", desc:"_ready, _process(delta), _physics_process, _input ; delta et l'ordre d'exécution dans Godot.", motscles:["_ready","_process","_physics_process","_input","delta","cycle de vie","node"] },
        { id:"gd08", fichier:"gd08-classes-poo.html",         titre:"Classes & objets (POO)",              niveau:"Intermédiaire", duree:"45 min", desc:"class_name, extends, héritage, membres, _init, classes internes, et la POO à la sauce Godot.", motscles:["classe","class_name","extends","héritage","POO","_init","objet","super"] },
        { id:"gd09", fichier:"gd09-nodes-scenes.html",        titre:"Nodes, scènes & instanciation",       niveau:"Intermédiaire", duree:"45 min", desc:"L'arbre de nodes, get_node et $, NodePath, instancier une scène (PackedScene), add_child, queue_free.", motscles:["node","scène","get_node","$","NodePath","instancier","PackedScene","add_child","queue_free"] },
        { id:"gd10", fichier:"gd10-signaux.html",             titre:"Signaux & communication",             niveau:"Avancé",        duree:"45 min", desc:"signal, emit_signal/emit, connecter dans l'éditeur ou par code, le patron observateur sans couplage.", motscles:["signal","emit","connect","communication","découplage","observateur","callback","événement"] },
        { id:"gd11", fichier:"gd11-collections.html",         titre:"Collections (Array, Dictionary)",     niveau:"Intermédiaire", duree:"40 min", desc:"Array, Dictionary, tableaux typés, parcours, ajouter/retirer, et choisir la bonne collection.", motscles:["collection","Array","Dictionary","tableau typé","itération","append","clé","valeur"] },
        { id:"gd12", fichier:"gd12-entrees-mouvement.html",   titre:"Entrées & mouvement",                 niveau:"Intermédiaire", duree:"45 min", desc:"Input et la carte d'entrées (Input Map), _input vs _process, CharacterBody2D/3D et move_and_slide.", motscles:["Input","Input Map","mouvement","CharacterBody2D","move_and_slide","velocity","delta","entrées"] },
        { id:"gd13", fichier:"gd13-ressources-export.html",   titre:"Ressources & variables exportées",    niveau:"Avancé",        duree:"40 min", desc:"@export et @onready, les Resource et custom resources (.tres), réglage dans l'Inspector et données partagées.", motscles:["@export","@onready","Resource","ressource","tres","Inspector","custom resource","données"] },
        { id:"gd14", fichier:"gd14-timers-await.html",        titre:"Timers, await & gestion du temps",    niveau:"Avancé",        duree:"40 min", desc:"Node Timer, get_tree().create_timer, await pour étaler une action, et les coroutines à la Godot.", motscles:["Timer","await","create_timer","coroutine","temps","délai","signal timeout","async"] },
        { id:"gd15", fichier:"gd15-bonnes-pratiques.html",    titre:"Bonnes pratiques, perfs & organisation",niveau:"Avancé",        duree:"45 min", desc:"Typage statique, @onready, éviter le travail par frame, organisation des scènes, débogage et mini-projet récapitulatif.", motscles:["bonnes pratiques","performance","typage statique","@onready","organisation","debug","scène","mini-projet"] }
      ]
    },
    {
      id: "shaders",
      titre: "Shaders & programmation graphique",
      kicker: "Piste 10",
      couleur: "var(--piste-shaders)",
      dossier: "cours/shaders/",
      icone: "sparkles",
      desc: "Comprendre et écrire des shaders : pipeline GPU, vertex & fragment, espaces et UV, textures, maths, éclairage, PBR, effets (dissolve, eau, toon), éditeurs à nœuds et performance.",
      lecons: [
        { id:"sh01", fichier:"sh01-introduction.html",        titre:"Introduction aux shaders",            niveau:"Débutant",      duree:"35 min", desc:"Qu'est-ce qu'un shader, pourquoi le GPU, où s'exécute le code, langages (HLSL/GLSL) et éditeurs à nœuds.", motscles:["shader","GPU","pipeline","HLSL","GLSL","vertex","fragment","temps réel"] },
        { id:"sh02", fichier:"sh02-pipeline-gpu.html",        titre:"Le pipeline graphique",               niveau:"Débutant",      duree:"40 min", desc:"Du sommet au pixel : vertex shader, rasterisation, fragment shader, profondeur et blending.", motscles:["pipeline","rasterisation","vertex shader","fragment shader","depth","blending","GPU"] },
        { id:"sh03", fichier:"sh03-vertex-shader.html",       titre:"Le vertex shader",                    niveau:"Intermédiaire", duree:"40 min", desc:"Transformer les sommets : matrices model/view/projection (MVP), position clip, données passées au fragment.", motscles:["vertex shader","MVP","matrice","clip space","position","varying","attribut"] },
        { id:"sh04", fichier:"sh04-fragment-shader.html",     titre:"Le fragment (pixel) shader",          niveau:"Intermédiaire", duree:"40 min", desc:"Calculer la couleur de chaque pixel, interpolation des données, sortie couleur, premiers dégradés.", motscles:["fragment shader","pixel","interpolation","couleur","gradient","UV","output"] },
        { id:"sh05", fichier:"sh05-espaces-uv.html",          titre:"Espaces, UV & normales",             niveau:"Intermédiaire", duree:"40 min", desc:"Object/world/view/clip space, coordonnées UV, normales et leur rôle, transformer entre espaces.", motscles:["espace","world space","view space","UV","normale","tangent","coordonnées"] },
        { id:"sh06", fichier:"sh06-textures.html",            titre:"Textures & échantillonnage",          niveau:"Intermédiaire", duree:"40 min", desc:"Sampler une texture, UV et tiling, filtrage et wrapping, combiner plusieurs textures (masques).", motscles:["texture","sampler","UV","tiling","filtrage","wrap","masque","sample"] },
        { id:"sh07", fichier:"sh07-maths.html",               titre:"Les maths du shader",                 niveau:"Intermédiaire", duree:"45 min", desc:"Vecteurs, dot/cross, lerp, clamp, step, smoothstep, frac — la boîte à outils du shader.", motscles:["vecteur","dot","cross","lerp","clamp","step","smoothstep","frac","maths"] },
        { id:"sh08", fichier:"sh08-eclairage.html",           titre:"Éclairage de base (diffus/spéculaire)",niveau:"Avancé",        duree:"45 min", desc:"Lambert (diffus), Phong/Blinn (spéculaire), rôle de la normale et de la direction de lumière.", motscles:["éclairage","Lambert","diffus","Phong","Blinn","spéculaire","normale","lumière"] },
        { id:"sh09", fichier:"sh09-pbr.html",                 titre:"PBR en shader (concepts)",            niveau:"Avancé",        duree:"45 min", desc:"Metallic/roughness, Fresnel, conservation de l'énergie et notion de BRDF — côté shader.", motscles:["PBR","metallic","roughness","Fresnel","BRDF","conservation énergie","spéculaire"] },
        { id:"sh10", fichier:"sh10-effets.html",              titre:"Effets courants (dissolve, rim…)",    niveau:"Avancé",        duree:"45 min", desc:"Dissolve par seuil/noise, contour Fresnel (rim light), hologramme, masques et alpha.", motscles:["effet","dissolve","Fresnel","rim","hologramme","noise","alpha","masque"] },
        { id:"sh11", fichier:"sh11-eau-deformation.html",     titre:"Eau & déformation de géométrie",      niveau:"Avancé",        duree:"45 min", desc:"Panning d'UV, déplacement de sommets (vertex displacement), normales animées pour l'eau/le vent.", motscles:["eau","panning","UV","vertex displacement","vagues","normales","vent","animation"] },
        { id:"sh12", fichier:"sh12-toon-npr.html",            titre:"Toon & rendu non photoréaliste",      niveau:"Avancé",        duree:"40 min", desc:"Cel shading par bandes (step), contours (outline), stylisation et seuils d'éclairage.", motscles:["toon","cel shading","NPR","outline","contour","step","bandes","stylisé"] },
        { id:"sh13", fichier:"sh13-editeurs-noeuds.html",     titre:"Éditeurs à nœuds (Graph)",            niveau:"Intermédiaire", duree:"40 min", desc:"Shader Graph (Unity), Material Editor (Unreal), VisualShader (Godot) : penser shader sans code.", motscles:["Shader Graph","Material Editor","VisualShader","nœuds","node","visuel","master material"] },
        { id:"sh14", fichier:"sh14-performance.html",         titre:"Performance des shaders",             niveau:"Avancé",        duree:"40 min", desc:"Coût par pixel, overdraw, branches dynamiques, instructions, half vs float, variantes de shader.", motscles:["performance","overdraw","branche","instructions","half","float","variante","coût pixel"] },
        { id:"sh15", fichier:"sh15-bonnes-pratiques.html",    titre:"Bonnes pratiques, debug & mini-projet",niveau:"Avancé",        duree:"45 min", desc:"Déboguer un shader (visualiser des valeurs), lisibilité, réutilisation, et mini-projet récapitulatif.", motscles:["bonnes pratiques","debug","shader","visualiser","réutilisation","mini-projet","organisation"] }
      ]
    },
    {
      id: "lua",
      titre: "Programmation Lua (scripting de jeu)",
      kicker: "Piste 11",
      couleur: "var(--piste-lua)",
      dossier: "cours/lua/",
      icone: "scroll",
      desc: "Apprendre Lua, le langage de script léger des jeux (Roblox/Luau, LÖVE, Defold) : variables, tables, fonctions, métatables & POO, modules, erreurs, coroutines, scripting de jeu et bonnes pratiques.",
      lecons: [
        { id:"lua01", fichier:"lua01-introduction.html",      titre:"Introduction à Lua",                  niveau:"Débutant",      duree:"35 min", desc:"Qu'est-ce que Lua, pourquoi un langage embarqué léger, où on l'utilise (Roblox, LÖVE, Defold), print et premier script.", motscles:["Lua","scripting","embarqué","Roblox","LÖVE","Defold","print","léger"] },
        { id:"lua02", fichier:"lua02-variables-types.html",   titre:"Variables & types",                   niveau:"Débutant",      duree:"35 min", desc:"nil, boolean, number, string, table ; typage dynamique, local vs global, déclaration et affectation.", motscles:["variable","type","nil","boolean","number","string","local","global"] },
        { id:"lua03", fichier:"lua03-operateurs.html",        titre:"Opérateurs & expressions",            niveau:"Débutant",      duree:"30 min", desc:"Arithmétique, comparaison (== ~=), logique (and/or/not), concaténation (..), longueur (#).", motscles:["opérateur","concaténation","..","and","or","not","longueur","#","comparaison"] },
        { id:"lua04", fichier:"lua04-conditions.html",        titre:"Conditions (if/elseif)",              niveau:"Débutant",      duree:"35 min", desc:"if / elseif / else, valeurs vraies/fausses (nil et false), et remplacer le switch par une table.", motscles:["if","elseif","else","condition","truthy","nil","false","table-switch"] },
        { id:"lua05", fichier:"lua05-boucles.html",           titre:"Boucles (for, while, ipairs/pairs)",  niveau:"Débutant",      duree:"35 min", desc:"for numérique, while, repeat-until, for générique avec ipairs et pairs, break.", motscles:["boucle","for","while","repeat","ipairs","pairs","break","itération"] },
        { id:"lua06", fichier:"lua06-fonctions.html",         titre:"Fonctions",                           niveau:"Intermédiaire", duree:"40 min", desc:"function, valeurs de retour multiples, varargs (...), fonctions anonymes et closures.", motscles:["fonction","function","retour multiple","varargs","closure","anonyme","return"] },
        { id:"lua07", fichier:"lua07-tables.html",            titre:"Les tables (cœur de Lua)",            niveau:"Intermédiaire", duree:"45 min", desc:"La table : tableau ET dictionnaire, indices, clés, tables imbriquées, parcours et manipulation.", motscles:["table","tableau","dictionnaire","clé","index","imbriqué","insert","remove"] },
        { id:"lua08", fichier:"lua08-metatables-poo.html",    titre:"Métatables & POO",                    niveau:"Avancé",        duree:"45 min", desc:"Métatables et métaméthodes (__index…), construire des classes et de l'héritage en Lua.", motscles:["métatable","metamethod","__index","POO","classe","héritage","self","setmetatable"] },
        { id:"lua09", fichier:"lua09-modules.html",           titre:"Modules & require",                   niveau:"Intermédiaire", duree:"40 min", desc:"Organiser le code en modules : retourner une table, require, portée et réutilisation.", motscles:["module","require","table","portée","réutilisation","organisation","return"] },
        { id:"lua10", fichier:"lua10-erreurs.html",           titre:"Gestion des erreurs (pcall)",         niveau:"Avancé",        duree:"40 min", desc:"error, pcall/xpcall, vérifications nil, assert, et gérer proprement les cas d'échec.", motscles:["erreur","error","pcall","xpcall","assert","nil","sécurité","robustesse"] },
        { id:"lua11", fichier:"lua11-coroutines.html",        titre:"Coroutines",                          niveau:"Avancé",        duree:"40 min", desc:"coroutine.create/resume/yield, étaler une logique dans le temps, séquences et états.", motscles:["coroutine","create","resume","yield","async","séquence","temps","état"] },
        { id:"lua12", fichier:"lua12-scripting-jeu.html",     titre:"Le scripting de jeu",                 niveau:"Intermédiaire", duree:"45 min", desc:"Boucle de jeu (update/draw), événements et callbacks, où Lua s'insère dans un moteur.", motscles:["scripting","boucle de jeu","update","draw","événement","callback","moteur"] },
        { id:"lua13", fichier:"lua13-integration-moteur.html",titre:"Intégration dans un moteur",          niveau:"Avancé",        duree:"45 min", desc:"Lua embarqué : Roblox (Luau, Instances/services), LÖVE (love.*), Defold ; le pont moteur ↔ Lua.", motscles:["Roblox","Luau","LÖVE","Defold","embarqué","API moteur","Instance","pont"] },
        { id:"lua14", fichier:"lua14-performance.html",       titre:"Performance & pièges",                niveau:"Avancé",        duree:"40 min", desc:"local vs global, réutilisation de tables, ramasse-miettes, # sur tables à trous, micro-optimisations utiles.", motscles:["performance","local","global","table","GC","ramasse-miettes","piège","optimisation"] },
        { id:"lua15", fichier:"lua15-bonnes-pratiques.html",  titre:"Bonnes pratiques & mini-projet",      niveau:"Avancé",        duree:"45 min", desc:"Conventions, modules, gestion d'état, débogage (print/inspect) et mini-projet récapitulatif.", motscles:["bonnes pratiques","convention","module","état","debug","mini-projet","organisation"] }
      ]
    },
    {
      id: "blueprints",
      titre: "Blueprints (scripting visuel Unreal)",
      kicker: "Piste 12",
      couleur: "var(--piste-blueprints)",
      dossier: "cours/blueprints/",
      icone: "nodes",
      desc: "Programmer sans écrire de code avec les Blueprints d'Unreal Engine : nœuds, flux d'exécution, variables, événements, conditions, boucles, fonctions, classes & héritage, communication entre Blueprints, composants, Timelines, performance et mini-projet.",
      lecons: [
        { id:"bp01", fichier:"bp01-introduction.html",        titre:"Introduction aux Blueprints",          niveau:"Débutant",      duree:"35 min", desc:"Le scripting visuel d'Unreal : qu'est-ce qu'un Blueprint, pourquoi des nœuds, Blueprint vs C++, types de Blueprints.", motscles:["Blueprint","scripting visuel","Unreal","nœud","node","C++","Actor"] },
        { id:"bp02", fichier:"bp02-editeur.html",              titre:"L'éditeur Blueprint",                 niveau:"Débutant",      duree:"35 min", desc:"Event Graph, Components, Viewport, panneau My Blueprint, Details ; naviguer et placer des nœuds.", motscles:["Event Graph","Components","Viewport","My Blueprint","Details","navigation","nœud"] },
        { id:"bp03", fichier:"bp03-flux-execution.html",       titre:"Le flux d'exécution",                 niveau:"Débutant",      duree:"35 min", desc:"Le fil blanc d'exécution, les broches d'exécution vs de données, l'ordre d'évaluation et le tirage de liens.", motscles:["exec","fil blanc","broche","pin","données","ordre","wire"] },
        { id:"bp04", fichier:"bp04-variables-types.html",      titre:"Variables & types",                   niveau:"Débutant",      duree:"35 min", desc:"Boolean, Integer, Float, String, Vector, Rotator, références d'objets ; Get/Set, valeur par défaut, exposition.", motscles:["variable","type","bool","float","vector","référence","Get","Set"] },
        { id:"bp05", fichier:"bp05-evenements.html",           titre:"Événements (BeginPlay, Tick, inputs)", niveau:"Débutant",      duree:"40 min", desc:"Event BeginPlay, Event Tick (et son coût), événements personnalisés, événements d'entrée (touches, axes).", motscles:["événement","BeginPlay","Tick","custom event","input","entrée","action"] },
        { id:"bp06", fichier:"bp06-conditions.html",           titre:"Conditions (Branch, Switch)",         niveau:"Débutant",      duree:"35 min", desc:"Le nœud Branch (if), Switch on Int/Enum, comparaisons et opérateurs booléens AND/OR/NOT.", motscles:["Branch","condition","Switch","Enum","booléen","comparaison","AND","OR"] },
        { id:"bp07", fichier:"bp07-boucles.html",              titre:"Boucles & Flow Control",              niveau:"Intermédiaire", duree:"40 min", desc:"ForLoop, ForEachLoop, WhileLoop, Flow Control (DoOnce, Gate, FlipFlop, Sequence) et le piège des boucles dans Tick.", motscles:["boucle","ForLoop","ForEach","WhileLoop","DoOnce","Gate","Sequence","FlipFlop"] },
        { id:"bp08", fichier:"bp08-fonctions-macros.html",     titre:"Fonctions, macros & graphes",         niveau:"Intermédiaire", duree:"40 min", desc:"Créer des fonctions (pure vs impure), macros, collapsed graphs, entrées/sorties, réutilisation et lisibilité.", motscles:["fonction","macro","pure","impure","collapse","réutilisation","entrée","sortie"] },
        { id:"bp09", fichier:"bp09-classes-heritage.html",     titre:"Classes & héritage de Blueprint",     niveau:"Intermédiaire", duree:"40 min", desc:"Classe parente, Blueprint enfant, surcharge d'événements/fonctions, Construction Script, organisation des classes.", motscles:["classe","héritage","parent","enfant","override","Construction Script","Actor"] },
        { id:"bp10", fichier:"bp10-communication.html",        titre:"Communication entre Blueprints",      niveau:"Avancé",        duree:"45 min", desc:"Références directes, Cast To, Blueprint Interfaces, Event Dispatchers : faire dialoguer plusieurs Blueprints.", motscles:["communication","Cast","référence","interface","Event Dispatcher","découplage"] },
        { id:"bp11", fichier:"bp11-composants-acteurs.html",   titre:"Composants & Actors",                 niveau:"Intermédiaire", duree:"40 min", desc:"Ajouter des composants (Mesh, Collision, Audio), Spawn Actor, Destroy Actor, hiérarchie et attachement.", motscles:["composant","component","Actor","Spawn","Destroy","collision","mesh","attach"] },
        { id:"bp12", fichier:"bp12-variables-exposees-ui.html",titre:"Variables exposées & UMG",            niveau:"Intermédiaire", duree:"40 min", desc:"Instance Editable, Expose on Spawn, communication avec l'UI (UMG Widget), liaison de données simples.", motscles:["instance editable","expose on spawn","UMG","Widget","UI","binding","gameplay"] },
        { id:"bp13", fichier:"bp13-timelines.html",            titre:"Timelines & animation par BP",        niveau:"Avancé",        duree:"40 min", desc:"Le nœud Timeline (float/vector/event tracks), Lerp, animer une porte ou une plateforme sans code.", motscles:["Timeline","animation","Lerp","track","courbe","interpolation","porte"] },
        { id:"bp14", fichier:"bp14-performance.html",          titre:"Performance & pièges",                niveau:"Avancé",        duree:"40 min", desc:"Coût du Tick, Cast lourds, nodes pure réévalués, Blueprint vs C++, profil et bonnes habitudes de perf.", motscles:["performance","Tick","Cast","pure","nativization","profil","optimisation","piège"] },
        { id:"bp15", fichier:"bp15-bonnes-pratiques.html",     titre:"Bonnes pratiques & mini-projet",      niveau:"Avancé",        duree:"45 min", desc:"Nommage, commentaires, organisation des graphes, débogage (Print/Breakpoint) et mini-projet : un objet à ramasser.", motscles:["bonnes pratiques","commentaire","organisation","debug","Print String","Breakpoint","mini-projet"] }
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
