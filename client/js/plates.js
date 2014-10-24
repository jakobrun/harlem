'use strict';
var size = 0.5;
var material = require('./material').createDefaultWithColor(0xff6666);
var shape = require('./boxshape')(size, size, 0.01),
    createBody = require('./body');

module.exports = function createPlates(world, x, y, z) {
    // Add linked boxes
    var space = 0.1 * size,
        N = 5,
        last,
        i;
    for (i = 0; i < N; i++) {
        var plate = createBody(shape, {
            mass: i === 0 ? 0 : 0.3,
            material: material,
            x: x,
            y: (y - i) * (size * 2 + 2 * space) + size * 2 + space,
            z: z
        });
        world.add(plate);

        if (i !== 0) {
            // Connect this body to the last one
            world.addPointToPointConstraint(plate, {
                x: -size,
                y: size + space,
                z: 0
            }, last, {
                x: -size,
                y: -size - space,
                z: 0
            });
            world.addPointToPointConstraint(plate, {
                x: size,
                y: size + space,
                z: 0
            }, last, {
                x: size,
                y: -size - space,
                z: 0
            });
        }
        last = plate;
    }

};
