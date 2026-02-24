// Low-poly French Bulldog - Seated - Origami Style
// All dimensions in mm, ~100mm tall
// Dog faces +X direction

$fn = 6; // Low poly! Keep facets visible

module body() {
    // Barrel-shaped torso, wider at chest
    translate([0, 0, 25])
    scale([1.3, 1, 0.9])
    rotate([0, 90, 0])
    cylinder(h=45, r1=18, r2=22, center=true, $fn=8);
}

module chest() {
    // Front chest bump
    translate([18, 0, 28])
    scale([0.8, 1, 0.85])
    sphere(r=22, $fn=8);
}

module rump() {
    // Rear seated rump
    translate([-22, 0, 18])
    scale([1.2, 1, 1])
    sphere(r=20, $fn=8);
}

module head() {
    // Large boxy head
    translate([28, 0, 52]) {
        // Main head block
        scale([1, 0.9, 0.85])
        cube([32, 36, 34], center=true);
    }
}

module muzzle() {
    // Short flat snout
    translate([46, 0, 45]) {
        scale([1, 0.9, 0.8])
        cube([14, 24, 22], center=true);
    }
}

module nose_bump() {
    translate([53, 0, 44])
    scale([1, 0.85, 0.7])
    sphere(r=6, $fn=6);
}

module ear(side) {
    // Bat ear - tall triangle
    mirror([0, side < 0 ? 1 : 0, 0])
    translate([24, side * 14, 68]) {
        rotate([side * 15, 0, 5])
        scale([0.7, 0.5, 1])
        cylinder(h=28, r1=12, r2=2, $fn=4);
    }
}

module front_leg(side) {
    translate([15, side * 12, 0]) {
        // Upper leg
        cube([12, 10, 28], center=true);
        // Paw
        translate([2, 0, -14])
        cube([14, 12, 5], center=true);
    }
}

module rear_leg(side) {
    // Folded haunch
    translate([-18, side * 16, 10]) {
        scale([1.2, 0.8, 0.7])
        sphere(r=14, $fn=6);
    }
    // Rear paw
    translate([-12, side * 18, 0])
    cube([16, 12, 5], center=true);
}

module tail() {
    translate([-32, 0, 22])
    rotate([0, -30, 0])
    scale([1, 0.8, 0.8])
    cylinder(h=8, r1=5, r2=2, $fn=5);
}

module base_plate() {
    // Flat base for printing
    translate([0, 0, -2.5])
    hull() {
        translate([20, 0, 0]) cylinder(h=3, r=18, $fn=8);
        translate([-25, 0, 0]) cylinder(h=3, r=22, $fn=8);
    }
}

// === ASSEMBLE ===
// Scale to ~100mm tall
scale_factor = 100 / 114.3;

scale([scale_factor, scale_factor, scale_factor]) {
    translate([0, 0, 16.5]) {
        union() {
            body();
            chest();
            rump();
            head();
            muzzle();
            nose_bump();
            ear(1);
            ear(-1);
            front_leg(1);
            front_leg(-1);
            rear_leg(1);
            rear_leg(-1);
            tail();
        }
    }
    base_plate();
}
