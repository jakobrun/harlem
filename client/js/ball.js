'use strict';
var radius = 0.12,
    shape = require('./sphereshape')(radius),
    createBody = require('./body'),
    material = require('./material');


module.exports = function balls(world) {
    var ballMaterial = material.create('ball', material.createImageView('/img/ball.jpg'));

    world.addContactMaterial(ballMaterial.physical, material.getDefault().physical, {
        friction: 0.2,
        restitution: 0.93
    });

    return function create() {
        var ball = createBody(shape, {
            mass: 0.6,
            material: ballMaterial
        });
        ball.body._gameType = 'ball';
        ball.radius = radius;
        world.add(ball);
        return ball;
    };
};
