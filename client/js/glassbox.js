'use strict';
var createBody = require('./body'),
    createBoxShape = require('./boxshape'),
    pSize = 0.02,
    particleShape = createBoxShape(pSize, pSize, pSize),
    shape = createBoxShape(1, 0.5, 1),
    glassMaterial = require('./material').createColoredGlass({
        color: 0xcccccc,
        opacity: 0.4
    }),
    mass = 25,
    blowUpVelo = 8;

module.exports = function create(world, x, y, z) {
    var body = createBody(shape, {
        mass: mass,
        material: glassMaterial,
        x: x,
        y: y,
        z: z
    });
    body.onCollide(function blowUp(e) {
        if (e.body && e.body._gameType === 'ball') {
            console.log('collide');

            var n = 200, pArray = [];
            while (n--) {
                var p = createBody(particleShape, {
                    mass: mass / n,
                    x: body.body.position.x + (Math.random() - 0.5) * 2,
                    y: body.body.position.y + (Math.random() - 0.5),
                    z: body.body.position.z + (Math.random() - 0.5) * 2,
                });
                p.body.velocity.set((Math.random() - 0.5) * blowUpVelo,
                (Math.random() - 0.5) * blowUpVelo,
                (Math.random() - 0.5) * blowUpVelo);
                pArray.push(p);
                world.add(p);
            }
            world.remove(body);
            setTimeout(function () {
            	pArray.forEach(world.remove);
            }, 2000);
        }
    });
    world.add(body);
    return body;
};
