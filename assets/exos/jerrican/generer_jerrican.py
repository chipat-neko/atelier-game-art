# -*- coding: utf-8 -*-
import bpy, bmesh, math, os
OUT="/tmp/jerri"; os.makedirs(OUT, exist_ok=True)
def reset(): bpy.ops.wm.read_factory_settings(use_empty=True)
def add_box(bm,cx,cy,cz,sx,sy,sz):
    vs=bmesh.ops.create_cube(bm,size=1.0)["verts"]
    for v in vs: v.co.x=v.co.x*sx+cx; v.co.y=v.co.y*sy+cy; v.co.z=v.co.z*sz+cz
    return vs
def add_cyl(bm,cx,cy,cz,r,h,seg=24):
    vs=bmesh.ops.create_cone(bm,cap_ends=True,segments=seg,radius1=r,radius2=r,depth=h)["verts"]
    for v in vs: v.co.x+=cx; v.co.y+=cy; v.co.z+=cz
    return vs
def obj_from_bm(bm,name):
    me=bpy.data.meshes.new(name); bm.to_mesh(me); me.update()
    ob=bpy.data.objects.new(name,me); bpy.context.collection.objects.link(ob); return ob
def build_blockout():
    bm=bmesh.new(); add_box(bm,0,0,0.25,0.34,0.17,0.50)
    add_box(bm,0,0,0.545,0.22,0.13,0.05); add_cyl(bm,0.11,0,0.57,0.05,0.10,16)
    bmesh.ops.remove_doubles(bm,verts=bm.verts,dist=1e-4); return obj_from_bm(bm,"jerrican_blockout")
def build_target():
    bm=bmesh.new(); add_box(bm,0,0,0.25,0.34,0.17,0.50)
    bmesh.ops.remove_doubles(bm,verts=bm.verts,dist=1e-5)
    ve=[e for e in bm.edges if abs(e.verts[0].co.z-e.verts[1].co.z)>0.3]
    bmesh.ops.bevel(bm,geom=ve,offset=0.02,segments=2,affect='EDGES')
    add_cyl(bm,0.11,0,0.55,0.045,0.10,20); add_cyl(bm,0.11,0,0.615,0.055,0.03,20)
    for sx in (-0.09,0.09): add_box(bm,sx,0,0.535,0.03,0.10,0.07)
    add_box(bm,0,0,0.565,0.24,0.10,0.03)
    bmesh.ops.remove_doubles(bm,verts=bm.verts,dist=1e-4)
    ob=obj_from_bm(bm,"jerrican_cible")
    for p in ob.data.polygons: p.use_smooth=True
    return ob
def princ(name, base, metal, rough):
    m=bpy.data.materials.new(name); m.use_nodes=True
    b=m.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value=(*base,1); b.inputs["Metallic"].default_value=metal
    b.inputs["Roughness"].default_value=rough; return m
def mat_black():
    m=bpy.data.materials.new("sil"); m.use_nodes=True; nt=m.node_tree; nt.nodes.clear()
    e=nt.nodes.new("ShaderNodeEmission"); e.inputs[0].default_value=(0,0,0,1)
    o=nt.nodes.new("ShaderNodeOutputMaterial"); nt.links.new(e.outputs[0],o.inputs[0]); return m
def set_mat(ob,m): ob.data.materials.clear(); ob.data.materials.append(m)
def world_color(rgb,s=1.0):
    w=bpy.data.worlds.get("World") or bpy.data.worlds.new("World"); bpy.context.scene.world=w
    w.use_nodes=True; bg=w.node_tree.nodes.get("Background")
    bg.inputs[0].default_value=(*rgb,1); bg.inputs[1].default_value=s
def add_sun(energy=2.0, ang=(55,12,40)):
    d=bpy.data.lights.new("s",'SUN'); d.energy=energy; o=bpy.data.objects.new("s",d)
    bpy.context.collection.objects.link(o); o.rotation_euler=tuple(math.radians(a) for a in ang)
def add_cam(loc,target=(0,0,0.30),ortho=None):
    cd=bpy.data.cameras.new("c"); cam=bpy.data.objects.new("c",cd); bpy.context.collection.objects.link(cam)
    cam.location=loc
    if ortho: cd.type='ORTHO'; cd.ortho_scale=ortho
    t=bpy.data.objects.new("t",None); t.location=target; bpy.context.collection.objects.link(t)
    c=cam.constraints.new('TRACK_TO'); c.target=t; c.track_axis='TRACK_NEGATIVE_Z'; c.up_axis='UP_Y'
    bpy.context.scene.camera=cam
def render(path,res=(1024,1024),samples=48,transparent=False):
    sc=bpy.context.scene; sc.render.engine='CYCLES'
    try: sc.cycles.device='CPU'
    except Exception: pass
    sc.cycles.samples=samples; sc.render.resolution_x,sc.render.resolution_y=res
    sc.render.film_transparent=transparent
    try: sc.view_settings.view_transform='Standard'
    except Exception: pass
    sc.render.filepath=path; bpy.ops.render.render(write_still=True)
def clear_lc():
    for o in list(bpy.data.objects):
        if o.type in ('CAMERA','LIGHT','EMPTY'): bpy.data.objects.remove(o,do_unlink=True)

# BLOCKOUT apercu
reset(); blk=build_blockout()
set_mat(blk, princ("clay",(0.46,0.47,0.5),0.0,0.85))
world_color((0.16,0.17,0.2),1.0); add_sun(2.2,(55,12,40)); add_sun(0.8,(120,-20,-140))
add_cam((0.95,-0.95,0.9)); render(os.path.join(OUT,"blockout_apercu.png"),(1000,1000),40)

# CIBLE rendu ref
reset(); tg=build_target()
set_mat(tg, princ("olive",(0.22,0.26,0.14),0.65,0.42))
world_color((0.18,0.19,0.22),1.0); add_sun(2.4,(55,12,40)); add_sun(0.9,(120,-20,-140))
add_cam((0.95,-0.95,0.9)); render(os.path.join(OUT,"ref_cible.png"),(1024,1024),72)

# SILHOUETTES (blanc pur)
set_mat(tg, mat_black()); world_color((1,1,1),1.0); clear_lc()
add_cam((0,-2.2,0.30),ortho=0.80); render(os.path.join(OUT,"sil_face.png"),(720,900),1)
add_cam((2.2,0,0.30),ortho=0.80); render(os.path.join(OUT,"sil_profil.png"),(720,900),1)
print("DONE2")
