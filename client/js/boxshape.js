'use strict';

module.exports = function createBoxShape(x, y, z) {
    var halfExtents = new CANNON.Vec3(x, y, z),
        boxShape = new CANNON.Box(halfExtents),
        boxGeometry = new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2);

    return {
    	shape: boxShape,
    	geometry: boxGeometry
    };
};
