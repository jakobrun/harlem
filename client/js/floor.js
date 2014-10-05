'use strict';
var defaultMaterial = require('./material').getDefault();

module.exports = function createFloor(world) {
    // Create a plane
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({mass: 0, material: defaultMaterial.physical});
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

    // floor
    var geometry = new THREE.PlaneGeometry(300, 300, 50, 50);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('/img/ground.jpg')
    }));
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    var floor = {
        body: groundBody,
        view: mesh
    };

    world.add(floor);
    return floor;
};
