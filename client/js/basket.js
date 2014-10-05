'use strict';
var createBoxShape = require('./boxshape'),
    createBody = require('./body'),
    rodShape = createBoxShape(0.015, 0.06, 2),
    glassMaterial = require('./material').createColoredGlass({
        color: 0xccaa99,
        opacity: 0.4
    }),
    createCylinderShape = require('./cylindershape'),
    plateShape = createBoxShape(0.9, 0.53, 0.02),
    ringEndShape = createBoxShape(0.09, 0.01, 0.075),
    cylinderShape = createCylinderShape(0.01, 0.11, 8);


module.exports = function createBasket(world) {
    var x = 0.4,
        y = 5.3,
        z = -8.8,
        rods = [createBody(rodShape, {
                x: -x,
                y: y,
                z: z
            }),
            createBody(rodShape, {
                x: x,
                y: y,
                z: z
            }),
            createBody(rodShape, {
                x: -x,
                y: y - 0.5,
                z: z
            }),
            createBody(rodShape, {
                x: x,
                y: y - 0.5,
                z: z
            })
        ];

    function createRing(x, y, z) {
        var n = 16,
            r = 0.23,
            rotateBy = Math.PI * 2 / n;
        for (var i = 0; i < n; i++) {
            world.add(createBody(cylinderShape, {
                x: x + Math.sin(rotateBy * i) * r,
                y: y,
                z: z + Math.cos(rotateBy * i) * r,
                rotation: {
                    x: Math.sin(rotateBy * i),
                    y: 0,
                    z: Math.cos(rotateBy * i),
                    angle: Math.PI / 2
                }
            }));
        }
    }

    //plate
    world.add(createBody(plateShape, {
        material: glassMaterial,
        x: 0,
        y: 0.53 + 3.05,
        z: -7.35
    }));

    //ring end
    world.add(createBody(ringEndShape, {
        x: 0,
        y: 3.2,
        z: -7.3
    }));

    //the ring
    createRing(0, 3.2, -7);

    rods.map(function(rod) {
        world.add(rod);
        rod.rotate(1, 0, 0, Math.PI * 0.25);
    });

};
