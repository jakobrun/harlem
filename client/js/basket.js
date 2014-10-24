'use strict';
var createBoxShape = require('./boxshape'),
    createBody = require('./body'),
    pSize = 0.02,
    particleShape = createBoxShape(pSize, pSize, pSize),
    blowUpVelo = 8,
    rodShape = createBoxShape(0.015, 0.06, 2),
    glassMaterial = require('./material').createColoredGlass({
        color: 0xccaa99,
        opacity: 0.9
    }),
    createCylinderShape = require('./cylindershape'),
    plateShape = createBoxShape(0.9, 0.53, 0.02),
    ringEndShape = createBoxShape(0.09, 0.01, 0.075),
    cylinderShape = createCylinderShape(0.01, 0.06, 8);


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
        ],
        plate, ringEnd, ringParts;

    function createRing(mass) {
        var n = 32,
            r = 0.23,
            x = 0,
            y = 3.2,
            z = -7,
            rotateBy = Math.PI * 2 / n;
        if(ringParts) {
            ringParts.forEach(world.remove);
        }
        ringParts = [];
        for (var i = 0; i < n; i++) {
            var part = createBody(cylinderShape, {
                x: x + Math.sin(rotateBy * i) * r,
                y: y,
                z: z + Math.cos(rotateBy * i) * r,
                mass: mass,
                rotation: {
                    x: Math.sin(rotateBy * i),
                    y: 0,
                    z: Math.cos(rotateBy * i),
                    angle: Math.PI / 2
                }
            });
            ringParts.push(part);
            world.add(part);
        }
    }

    //plate
    var createPlate = function (mass) {
        if(plate) {
            world.remove(plate);
        }
        plate = createBody(plateShape, {
            material: glassMaterial,
            mass: mass,
            x: 0,
            y: 0.53 + 3.05,
            z: -7.35
        });
        world.add(plate);
    };
    createPlate(0);

    //ring end
    var createRingEnd = function(mass){
        if(ringEnd) {
            world.remove(ringEnd);
        }
        ringEnd = createBody(ringEndShape, {
            x: 0,
            y: 3.2,
            z: -7.3,
            mass: mass
        });
        world.add(ringEnd);        
    };
    createRingEnd(0);

    //the ring
    createRing(0);

    plate.onCollide(function (e) {
        if (e.body && e.body._gameType === 'ball') {

            var n = 100, pArray = [], mass = 5;
            while (n--) {
                var p = createBody(particleShape, {
                    material: glassMaterial,
                    mass: mass / n,
                    x: plate.body.position.x + (Math.random() - 0.5) * 2,
                    y: plate.body.position.y + (Math.random() - 0.5),
                    z: plate.body.position.z,
                });
                p.body.velocity.set((Math.random() - 0.5) * blowUpVelo,
                (Math.random() - 0.5) * blowUpVelo,
                (Math.random() - 0.5));
                pArray.push(p);
                world.add(p);
            }
            world.remove(plate);
            setTimeout(function () {
                pArray.forEach(world.remove);
                ringParts.forEach(world.remove);
            }, 2000);
            createRingEnd(0.5);
            createRing(0.1);
        }
    });

    rods.map(function(rod) {
        world.add(rod);
        rod.rotate(1, 0, 0, Math.PI * 0.25);
    });

};
