'use strict';

module.exports = function createSphereShape(radius) {
    var shape = new CANNON.Sphere(radius),
        geometry = new THREE.SphereGeometry(radius, 32, 32);

    return {
    	shape: shape,
    	geometry: geometry
    };
};
