'use strict';

module.exports = function createCylinderShape(radius, height, numSegments) {
    var shape = new CANNON.Cylinder(radius, radius, height, numSegments ),
        geometry = new THREE.CylinderGeometry(radius, radius, height, numSegments, 1, false);

    return {
    	shape: shape,
    	geometry: geometry
    };
};
