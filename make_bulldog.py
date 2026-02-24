#!/usr/bin/env python3
"""
Low-poly French Bulldog (seated, origami style) — STL generator
Uses numpy-stl. All geometry is manual triangles for full control.
The dog faces +X direction, seated, ~100mm tall.
"""

import numpy as np
from stl import mesh
import math

def quad(v0, v1, v2, v3):
    """Two triangles from 4 vertices (CCW winding for outward normal)."""
    return [(v0, v1, v2), (v0, v2, v3)]

def tri(v0, v1, v2):
    return [(v0, v1, v2)]

def mirror_z(triangles):
    """Mirror triangles across Z=0 plane (flip z, reverse winding)."""
    mirrored = []
    for t in triangles:
        mirrored.append(tuple(np.array([v[0], v[1], -v[2]]) for v in reversed(t)))
    return mirrored

def build_bulldog():
    all_tris = []
    
    # ============================================================
    # BODY (barrel-shaped torso, seated position)
    # Body is a truncated wedge — wide at chest, narrows at rear
    # Dog faces +X. Body center around x=0. Z is left-right, Y is up.
    # ============================================================
    
    bw = 22  # body half-width (z)
    
    # Body vertices (right half, will mirror for left)
    # Front-bottom
    fb_lo = np.array([15, 5, bw])
    fb_hi = np.array([15, 45, bw])
    # Front-center (chest)
    fc_lo = np.array([20, 0, bw-5])
    fc_hi = np.array([20, 50, bw-5])
    # Rear
    rb_lo = np.array([-25, 5, bw])
    rb_hi = np.array([-25, 40, bw-2])
    # Rear-bottom (where it sits)
    rr_lo = np.array([-30, 0, bw-5])
    rr_hi = np.array([-20, 42, bw-2])
    
    # Simplified body as a box-ish shape
    # Let's define the body as key cross-sections and connect them
    
    # === BODY as connected polygons ===
    # Cross section at front (chest): a rough pentagon
    # Cross section at back (rump): smaller, lower
    
    # Front cross-section vertices (x = 18) — right side
    cf = [
        np.array([18, 0, 0]),      # bottom center
        np.array([18, 0, 22]),     # bottom right
        np.array([18, 48, 20]),    # top right
        np.array([18, 55, 0]),     # top center
    ]
    # Back cross-section vertices (x = -28)
    cb = [
        np.array([-28, 0, 0]),     # bottom center
        np.array([-28, 0, 20]),    # bottom right
        np.array([-28, 38, 18]),   # top right
        np.array([-28, 42, 0]),    # top center
    ]
    
    # Right side panels (connect front to back)
    for i in range(len(cf)-1):
        all_tris += quad(cf[i], cb[i], cb[i+1], cf[i+1])
    
    # Mirror for left side
    def mz(v):
        return np.array([v[0], v[1], -v[2]])
    
    cf_l = [mz(v) for v in cf]
    cb_l = [mz(v) for v in cb]
    
    for i in range(len(cf_l)-1):
        all_tris += quad(cf_l[i+1], cb_l[i+1], cb_l[i], cf_l[i])
    
    # Bottom panel
    all_tris += quad(cf[0], cf[1], cb[1], cb[0])
    all_tris += quad(cf_l[1], cf_l[0], cb_l[0], cb_l[1])
    
    # Top panel (back/spine)
    all_tris += quad(cf[-1], cf[-2], cb[-2], cb[-1])
    all_tris += quad(cf_l[-2], cf_l[-1], cb_l[-1], cb_l[-2])
    
    # Front face
    for i in range(len(cf)-1):
        all_tris += tri(cf[i], cf[i+1], cf_l[i+1])
        all_tris += tri(cf[i], cf_l[i+1], cf_l[i])
    
    # Back face  
    for i in range(len(cb)-1):
        all_tris += tri(cb[i], cb_l[i+1], cb[i+1])
        all_tris += tri(cb[i], cb_l[i], cb_l[i+1])
    
    # ============================================================
    # HEAD (large, boxy, French bulldog style)
    # Positioned at front of body, facing +X
    # ============================================================
    
    hx = 18  # head start x (connects to body front)
    hw = 19  # head half-width
    hy_lo = 30  # head bottom y
    hy_hi = 75  # head top y
    hd = 30   # head depth (x extent)
    
    # Head is a slightly tapered box
    # Back face of head (at hx)
    hb = [
        np.array([hx, hy_lo, -hw]),
        np.array([hx, hy_lo, hw]),
        np.array([hx, hy_hi, hw]),
        np.array([hx, hy_hi, -hw]),
    ]
    # Front face of head (at hx+hd), slightly narrower and shorter
    fw = 16
    hf = [
        np.array([hx+hd, hy_lo+2, -fw]),
        np.array([hx+hd, hy_lo+2, fw]),
        np.array([hx+hd, hy_hi-5, fw]),
        np.array([hx+hd, hy_hi-5, -fw]),
    ]
    
    # Head sides
    for i in range(4):
        j = (i+1) % 4
        all_tris += quad(hb[i], hf[i], hf[j], hb[j])
    # Head front face
    all_tris += quad(hf[0], hf[1], hf[2], hf[3])
    # Head back face (partially — connects to body, but close it)
    all_tris += quad(hb[3], hb[2], hb[1], hb[0])
    
    # ============================================================
    # MUZZLE (short, flat, protruding snout)
    # ============================================================
    mx = hx + hd  # starts at front of head
    mw = 12  # muzzle half-width
    my_lo = hy_lo + 2
    my_hi = hy_lo + 22
    md = 12  # muzzle depth
    
    mb = [
        np.array([mx, my_lo, -mw]),
        np.array([mx, my_lo, mw]),
        np.array([mx, my_hi, mw]),
        np.array([mx, my_hi, -mw]),
    ]
    mf = [
        np.array([mx+md, my_lo+2, -mw+2]),
        np.array([mx+md, my_lo+2, mw-2]),
        np.array([mx+md, my_hi-2, mw-2]),
        np.array([mx+md, my_hi-2, -mw+2]),
    ]
    
    for i in range(4):
        j = (i+1) % 4
        all_tris += quad(mb[i], mf[i], mf[j], mb[j])
    all_tris += quad(mf[0], mf[1], mf[2], mf[3])
    # back face not needed (merges with head front)
    
    # ============================================================
    # EARS (large triangular bat ears — iconic French Bulldog)
    # Two tall triangular prisms sticking up from head
    # ============================================================
    
    for side in [1, -1]:
        ez = side * 14  # ear center z
        ear_base_inner = np.array([hx+10, hy_hi, ez - side*4])
        ear_base_outer = np.array([hx+10, hy_hi, ez + side*8])
        ear_base_back = np.array([hx-2, hy_hi-3, ez + side*2])
        ear_tip = np.array([hx+8, hy_hi+30, ez + side*5])
        
        # Ear as a tetrahedron (4 faces)
        if side == 1:
            all_tris += tri(ear_base_inner, ear_base_outer, ear_tip)
            all_tris += tri(ear_base_outer, ear_base_back, ear_tip)
            all_tris += tri(ear_base_back, ear_base_inner, ear_tip)
            all_tris += tri(ear_base_inner, ear_base_back, ear_base_outer)
        else:
            all_tris += tri(ear_base_outer, ear_base_inner, ear_tip)
            all_tris += tri(ear_base_back, ear_base_outer, ear_tip)
            all_tris += tri(ear_base_inner, ear_base_back, ear_tip)
            all_tris += tri(ear_base_back, ear_base_inner, ear_base_outer)
    
    # ============================================================
    # FRONT LEGS (two short rectangular prisms)
    # ============================================================
    
    for side in [1, -1]:
        lz = side * 14  # leg center z
        lw = 6  # leg half-width
        lx = 12  # leg x position
        
        # Leg top (connects to body)
        lt = [
            np.array([lx-5, 0, lz-lw]),
            np.array([lx+5, 0, lz-lw]),
            np.array([lx+5, 0, lz+lw]),
            np.array([lx-5, 0, lz+lw]),
        ]
        # Leg bottom (on ground)
        lb_leg = [
            np.array([lx-5, -30, lz-lw]),   # ground level will be shifted later
            np.array([lx+8, -30, lz-lw]),
            np.array([lx+8, -30, lz+lw]),
            np.array([lx-5, -30, lz+lw]),
        ]
        
        # Sides
        for i in range(4):
            j = (i+1) % 4
            if side == 1:
                all_tris += quad(lt[i], lb_leg[i], lb_leg[j], lt[j])
            else:
                all_tris += quad(lt[j], lb_leg[j], lb_leg[i], lt[i])
        # Bottom
        if side == 1:
            all_tris += quad(lb_leg[0], lb_leg[1], lb_leg[2], lb_leg[3])
        else:
            all_tris += quad(lb_leg[3], lb_leg[2], lb_leg[1], lb_leg[0])
    
    # ============================================================
    # REAR LEGS / HAUNCHES (folded, seated position)
    # Visible as bumps on the sides near the rear
    # ============================================================
    
    for side in [1, -1]:
        hz = side * 22  # haunch z (outside body)
        hx_r = -15  # haunch x center
        
        # Haunch as a rounded bump — use a wedge/triangular prism
        h1 = np.array([hx_r-12, 0, hz])
        h2 = np.array([hx_r+10, 0, hz])
        h3 = np.array([hx_r+5, 20, hz])
        h4 = np.array([hx_r-8, 25, hz])
        
        # Inner face (closer to body)
        iz = side * 18
        h1i = np.array([hx_r-12, 0, iz])
        h2i = np.array([hx_r+10, 0, iz])
        h3i = np.array([hx_r+5, 20, iz])
        h4i = np.array([hx_r-8, 25, iz])
        
        verts_outer = [h1, h2, h3, h4]
        verts_inner = [h1i, h2i, h3i, h4i]
        
        # Outer face
        if side == 1:
            all_tris += quad(h1, h2, h3, h4)
            # Inner face
            all_tris += quad(h4i, h3i, h2i, h1i)
        else:
            all_tris += quad(h4, h3, h2, h1)
            all_tris += quad(h1i, h2i, h3i, h4i)
        
        # Connect outer to inner
        for i in range(4):
            j = (i+1) % 4
            if side == 1:
                all_tris += quad(verts_outer[i], verts_inner[i], verts_inner[j], verts_outer[j])
            else:
                all_tris += quad(verts_outer[j], verts_inner[j], verts_inner[i], verts_outer[i])
        
        # Rear paw (small block on ground at rear)
        paw_pts_top = [
            np.array([hx_r-10, 0, iz]),
            np.array([hx_r+2, 0, iz]),
            np.array([hx_r+2, 0, hz]),
            np.array([hx_r-10, 0, hz]),
        ]
        paw_pts_bot = [
            np.array([hx_r-10, -5, iz]),
            np.array([hx_r+2, -5, iz]),
            np.array([hx_r+2, -5, hz]),
            np.array([hx_r-10, -5, hz]),
        ]
        
        if side == 1:
            for i in range(4):
                j = (i+1) % 4
                all_tris += quad(paw_pts_top[i], paw_pts_bot[i], paw_pts_bot[j], paw_pts_top[j])
            all_tris += quad(paw_pts_bot[0], paw_pts_bot[1], paw_pts_bot[2], paw_pts_bot[3])
            all_tris += quad(paw_pts_top[3], paw_pts_top[2], paw_pts_top[1], paw_pts_top[0])
        else:
            for i in range(4):
                j = (i+1) % 4
                all_tris += quad(paw_pts_top[j], paw_pts_bot[j], paw_pts_bot[i], paw_pts_top[i])
            all_tris += quad(paw_pts_bot[3], paw_pts_bot[2], paw_pts_bot[1], paw_pts_bot[0])
            all_tris += quad(paw_pts_top[0], paw_pts_top[1], paw_pts_top[2], paw_pts_top[3])
    
    # ============================================================
    # Shift everything so ground plane is y=0
    # Find min y and shift up
    # ============================================================
    
    min_y = min(v[1] for t in all_tris for v in t)
    shifted = []
    for t in all_tris:
        shifted.append(tuple(np.array([v[0], v[1] - min_y, v[2]]) for v in t))
    all_tris = shifted
    
    # ============================================================
    # Scale to ~100mm tall
    # ============================================================
    max_y = max(v[1] for t in all_tris for v in t)
    scale = 100.0 / max_y
    scaled = []
    for t in all_tris:
        scaled.append(tuple(v * scale for v in t))
    all_tris = scaled
    
    # ============================================================
    # Build STL mesh
    # ============================================================
    
    n = len(all_tris)
    m = mesh.Mesh(np.zeros(n, dtype=mesh.Mesh.dtype))
    for i, t in enumerate(all_tris):
        for j in range(3):
            m.vectors[i][j] = t[j]
    
    m.update_normals()
    m.save('/home/ubuntu/.openclaw/workspace/gasper-bulldog.stl')
    print(f"Saved STL with {n} triangles")
    print(f"Bounds: x=[{m.x.min():.1f}, {m.x.max():.1f}] y=[{m.y.min():.1f}, {m.y.max():.1f}] z=[{m.z.min():.1f}, {m.z.max():.1f}]")

if __name__ == '__main__':
    build_bulldog()
