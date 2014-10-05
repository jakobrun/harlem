'use strict';

function create(physicalName, view) {
    return {
        physical: new CANNON.Material(physicalName),
        view: view
    };
}

function createImageView(imgPath) {
    return new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture(imgPath),
    });
}

var defaultMaterial = create('defaultMaterial',
    new THREE.MeshLambertMaterial({
        color: 0xddeeee
    }));

function createDefaultWithImage(imgPath) {
    return {
        physical: defaultMaterial.physical,
        view: createImageView(imgPath)
    };
}

function createColoredGlass(options) {
    return {
        physical: defaultMaterial.physical,
        view: new THREE.MeshLambertMaterial({
            color: options.color || 0xdddddd,
            depthWrite: false,
            transparent: true,
            opacity: options.opacity || 0.5,
            side: THREE.DoubleSide,
            combine: THREE.MixOperation
        })
    };
}

function createDefaultWithColor(color) {
    return {
        physical: defaultMaterial.physical,
        view: new THREE.MeshLambertMaterial({
            color: color
        })
    };
}

module.exports = {
    create: create,
    createImageView: createImageView,
    createDefaultWithImage: createDefaultWithImage,
    createDefaultWithColor: createDefaultWithColor,
    createColoredGlass: createColoredGlass,
    getDefault: function() {
        return defaultMaterial;
    }
};
