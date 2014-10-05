'use strict';
var defaultMaterial = require('./material').getDefault();

module.exports = function createBody(shape, options) {
    var x = options.x || 0,
        y = options.y || 0,
        z = options.z || 0,
        material = options.material || defaultMaterial,
        rotation = options.rotation;
    var body = new CANNON.Body({
        mass: options.mass ||  0,
        material: material.physical
    });
    var mesh = new THREE.Mesh(shape.geometry, material.view);
    body.addShape(shape.shape);
    body.linearDamping = options.linearDamping || 0.4;
    // body.angularDamping = 0.01;
    body.position.set(x, y, z);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    function updatePos() {
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
    }
    if (rotation) {
        body.quaternion.setFromAxisAngle(new CANNON.Vec3(rotation.x, rotation.y, rotation.z), rotation.angle);
    }

    updatePos();

    var bodyWrap = {
        body: body,
        view: mesh,
        onCollide: function(listener) {
            body.addEventListener('collide', listener);
        },
        setPosition: function(x, y, z) {
            body.position.set(x, y, z);
            mesh.position.set(x, y, z);
        },
        rotate: function(x, y, z, angle) {
            body.quaternion.setFromAxisAngle(new CANNON.Vec3(x, y, z), angle);
            updatePos();
        }
    };

    if (options.mass) {
        bodyWrap.render = updatePos;
    }

    return bodyWrap;
};
