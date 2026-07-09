# -*- coding: utf-8 -*-
# Genere une "caisse en bois" pour le kit d'exercices : version low-poly depliee
# et version high-poly biseautee/subsurf, avec materiau bois, exports FBX/GLB,
# et rendus de reference. 100% headless (bpy).
import bpy, bmesh, math, os
from mathutils import Vector

OUT = "/sessions/determined-hopeful-shannon/tools/out"
os.makedirs(OUT, exist_ok=True)

# ---------- utilitaires scene ----------
def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def add_box(bm, cx, cy, cz, sx, sy, sz):
    m = bmesh.ops.create_cube(bm, size=1.0)["verts"]
    for v in m:
        v.co.x = v.co.x * sx + cx
        v.co.y = v.co.y * sy + cy
        v.co.z = v.co.z * sz + cz

# ---------- geometrie de la caisse (liste de planches) ----------
# Repere : X,Y dans [-0.5,0.5], Z dans [0,1]. La caisse fait ~1 m.
def build_crate_bmesh():
    bm = bmesh.new()
    P = 0.09      # section des montants
    T = 0.055     # epaisseur des planches
    half = 0.5
    inset = half - P/2.0
    # 4 montants verticaux
    for sx in (-1, 1):
        for sy in (-1, 1):
            add_box(bm, sx*inset, sy*inset, 0.5, P, P, 1.0)
    # plancher : 3 lattes selon X
    for yy in (-0.28, 0.0, 0.28):
        add_box(bm, 0.0, yy, T/2.0, 1.0-2*P, 0.22, T)
    # cadre haut : 2 rails selon X + 2 selon Y
    ztop = 1.0 - T/2.0
    for sy in (-1, 1):
        add_box(bm, 0.0, sy*inset, ztop, 1.0-2*P, P, T)
    for sx in (-1, 1):
        add_box(bm, sx*inset, 0.0, ztop, P, 1.0-2*P, T)
    # lattes des 4 parois (2 hauteurs)
    for zz in (0.34, 0.70):
        # avant / arriere (parois y = +/-0.5)
        for sy in (-1, 1):
            add_box(bm, 0.0, sy*(half-T/2.0), zz, 1.0-2*P, T, 0.17)
        # gauche / droite (parois x = +/-0.5)
        for sx in (-1, 1):
            add_box(bm, sx*(half-T/2.0), 0.0, zz, T, 1.0-2*P, 0.17)
    # nettoyage : fusionne les sommets confondus
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-4)
    return bm

def mesh_from_bmesh(bm, name):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    me.update()
    ob = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(ob)
    return ob

def set_active(ob):
    bpy.context.view_layer.objects.active = ob
    for o in bpy.data.objects: o.select_set(False)
    ob.select_set(True)

# ---------- UV : projection par direction dominante (box map, 6 tuiles) ----------
def box_project_uv(ob):
    me = ob.data
    if not me.uv_layers:
        me.uv_layers.new(name="UVMap")
    uv = me.uv_layers.active.data
    # bornes du modele pour normaliser
    xs = [v.co.x for v in me.vertices]; ys=[v.co.y for v in me.vertices]; zs=[v.co.z for v in me.vertices]
    mnx,mny,mnz = min(xs),min(ys),min(zs)
    ex = max(1e-6, max(xs)-mnx); ey=max(1e-6,max(ys)-mny); ez=max(1e-6,max(zs)-mnz)
    E = max(ex,ey,ez)
    tw, th = 1.0/3.0, 1.0/2.0
    marg = 0.06
    me.calc_loop_triangles()
    for poly in me.polygons:
        n = poly.normal
        ax = max(range(3), key=lambda i: abs(n[i]))     # 0=X,1=Y,2=Z
        sign = 0 if n[ax] >= 0 else 1
        col = ax; row = sign
        ox, oy = col*tw, row*th
        for li in poly.loop_indices:
            vi = me.loops[li].vertex_index
            co = me.vertices[vi].co
            if ax == 0:   a,b = (co.y-mny)/E, (co.z-mnz)/E
            elif ax == 1: a,b = (co.x-mnx)/E, (co.z-mnz)/E
            else:         a,b = (co.x-mnx)/E, (co.y-mny)/E
            u = ox + tw*(marg + a*(1-2*marg))
            v = oy + th*(marg + b*(1-2*marg))
            uv[li].uv = (u, v)

# ---------- materiau bois procedural ----------
def wood_material():
    mat = bpy.data.materials.new("Bois_Caisse")
    mat.use_nodes = True
    nt = mat.node_tree; nodes = nt.nodes; links = nt.links
    nodes.clear()
    out = nodes.new("ShaderNodeOutputMaterial"); out.location=(600,0)
    bsdf = nodes.new("ShaderNodeBsdfPrincipled"); bsdf.location=(300,0)
    tex = nodes.new("ShaderNodeTexNoise"); tex.location=(-200,0)
    tex.inputs["Scale"].default_value = 8.0
    tex.inputs["Detail"].default_value = 6.0
    ramp = nodes.new("ShaderNodeValToRGB"); ramp.location=(0,0)
    ramp.color_ramp.elements[0].position = 0.35
    ramp.color_ramp.elements[0].color = (0.14, 0.075, 0.032, 1)
    ramp.color_ramp.elements[1].position = 0.75
    ramp.color_ramp.elements[1].color = (0.33, 0.19, 0.09, 1)
    links.new(tex.outputs["Fac"], ramp.inputs["Fac"])
    links.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.72
    links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    return mat

def assign_mat(ob, mat):
    ob.data.materials.clear()
    ob.data.materials.append(mat)

# ---------- eclairage + camera + rendu ----------
def setup_world():
    w = bpy.data.worlds.new("W"); bpy.context.scene.world = w
    w.use_nodes = True
    bg = w.node_tree.nodes.get("Background")
    bg.inputs[0].default_value = (0.05,0.06,0.08,1)
    bg.inputs[1].default_value = 0.4

def add_light():
    l = bpy.data.lights.new("Key","AREA"); l.energy=1400; l.size=4
    ob = bpy.data.objects.new("Key", l); bpy.context.collection.objects.link(ob)
    ob.location=(2.5,-2.0,3.2)
    d = (Vector((0,0,0.5))-ob.location).normalized()
    ob.rotation_euler = d.to_track_quat('-Z','Y').to_euler()
    l2 = bpy.data.lights.new("Fill","AREA"); l2.energy=350; l2.size=5
    ob2 = bpy.data.objects.new("Fill", l2); bpy.context.collection.objects.link(ob2)
    ob2.location=(-3.0,-1.5,1.5)
    d2 = (Vector((0,0,0.5))-ob2.location).normalized()
    ob2.rotation_euler = d2.to_track_quat('-Z','Y').to_euler()

def add_camera():
    cam = bpy.data.cameras.new("Cam"); ob = bpy.data.objects.new("Cam", cam)
    bpy.context.collection.objects.link(ob); bpy.context.scene.camera = ob
    ob.location = (2.6, -2.9, 1.9)
    d = (Vector((0,0,0.48))-ob.location).normalized()
    ob.rotation_euler = d.to_track_quat('-Z','Y').to_euler()
    cam.lens = 50

def add_ground():
    bm = bmesh.new(); bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=20)
    me = bpy.data.meshes.new("Sol"); bm.to_mesh(me)
    ob = bpy.data.objects.new("Sol", me); bpy.context.collection.objects.link(ob)
    mat = bpy.data.materials.new("SolMat"); mat.use_nodes=True
    b = mat.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value=(0.12,0.12,0.13,1); b.inputs["Roughness"].default_value=0.9
    ob.data.materials.append(mat)
    return ob

def render_to(path, samples=48, res=(1000,750)):
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = samples
    sc.cycles.use_denoising = True
    try: sc.cycles.denoiser = 'OPENIMAGEDENOISE'
    except Exception: pass
    sc.render.resolution_x, sc.render.resolution_y = res
    sc.render.image_settings.file_format = 'PNG'
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)

# ---------- construction ----------
def make_low():
    reset_scene()
    bm = build_crate_bmesh()
    ob = mesh_from_bmesh(bm, "Caisse_Low")
    set_active(ob)
    # petit bevel non destructif -> applique
    mod = ob.modifiers.new("Bevel","BEVEL"); mod.width=0.007; mod.segments=1; mod.limit_method='ANGLE'
    bpy.ops.object.modifier_apply(modifier=mod.name)
    box_project_uv(ob)
    assign_mat(ob, wood_material())
    return ob

def make_high():
    reset_scene()
    bm = build_crate_bmesh()
    ob = mesh_from_bmesh(bm, "Caisse_High")
    set_active(ob)
    b = ob.modifiers.new("Bevel","BEVEL"); b.width=0.012; b.segments=3; b.limit_method='ANGLE'
    s = ob.modifiers.new("Subsurf","SUBSURF"); s.levels=2; s.render_levels=2
    bpy.ops.object.modifier_apply(modifier="Bevel")
    bpy.ops.object.modifier_apply(modifier="Subsurf")
    assign_mat(ob, wood_material())
    return ob

def tri_count(ob):
    ob.data.calc_loop_triangles()
    return len(ob.data.loop_triangles)

log = []

# --- LOW : construit, deplie, materiau, exporte, sauvegarde, rend ---
low = make_low()
log.append("LOW tris=%d verts=%d" % (tri_count(low), len(low.data.vertices)))
setup_world(); add_light(); add_camera(); ground = add_ground()
# exports (uniquement la caisse)
set_active(low)
bpy.ops.export_scene.fbx(filepath=OUT+"/caisse_low.fbx", use_selection=True, object_types={'MESH'}, apply_unit_scale=True, bake_space_transform=True)
bpy.ops.export_scene.gltf(filepath=OUT+"/caisse_low.glb", export_format='GLB', use_selection=True)
render_to(OUT+"/ref_low.png")
# sauvegarde blend low (caisse + sol + lumieres)
bpy.ops.wm.save_as_mainfile(filepath=OUT+"/caisse_low.blend")

# --- HIGH : construit, materiau, rend, sauvegarde ---
high = make_high()
log.append("HIGH tris=%d verts=%d" % (tri_count(high), len(high.data.vertices)))
setup_world(); add_light(); add_camera(); add_ground()
render_to(OUT+"/ref_high.png")
bpy.ops.wm.save_as_mainfile(filepath=OUT+"/caisse_high.blend")

open(OUT+"/build.log","w").write("\n".join(log)+"\n")
print("BUILD_OK\n" + "\n".join(log))
