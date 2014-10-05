'use strict';
var shape = require('./boxshape')(7, 5, 0.3),
    createBody = require('./body'),
    material = require('./material').createDefaultWithImage('/img/harlem.jpg');

module.exports = function(x, y, z) {
    return createBody(shape, {x: x, y: y, z: z, material: material});
};
