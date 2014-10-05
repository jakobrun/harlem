'use strict';
var balls = require('./ball'),
    material = require('./material').getDefault(),
	remote = require('./remotelistener');

module.exports = function createPlayer(
    game,
    theWorld) {
    // Create a sphere
    var radius = 1,
        playerShape = new CANNON.Sphere(radius),
        playerBody = new CANNON.Body({mass: 5, material: material.physical});
    playerBody.addShape(playerShape);
    playerBody.position.set(0, 3, 0);
    playerBody.linearDamping = 0.9;

    var createBall = balls(theWorld);
    var shootDirection = new THREE.Vector3();
    var projector = new THREE.Projector();

    function getShootDir(targetVec) {
        var vector = targetVec;
        targetVec.set(0,0,1);
        projector.unprojectVector(vector, theWorld.getCamera());
        var ray = new THREE.Ray(playerBody.position, vector.sub(playerBody.position).normalize() );
        targetVec.x = ray.direction.x;
        targetVec.y = ray.direction.y + 0.5;
        targetVec.z = ray.direction.z;
    }

    var shoot = function (velo) {
        if (game.enabled) {
            var x = playerBody.position.x;
            var y = playerBody.position.y;
            var z = playerBody.position.z;
            getShootDir(shootDirection);
            var ball = createBall();

            // Move the ball outside the player sphere
            x += shootDirection.x * (playerShape.radius * 1.02 + ball.radius);
            y += shootDirection.y * (playerShape.radius * 1.02 + ball.radius);
            z += shootDirection.z * (playerShape.radius * 1.02 + ball.radius);

            ball.body.velocity.set(shootDirection.x * velo,
                shootDirection.y * velo,
                shootDirection.z * velo);
            ball.setPosition(x, y, z);
        }    	
    	
    };

    window.addEventListener('click', function() {
    	shoot(7);
    });

    remote.setTriggercontrol(function (data) {
    	shoot((data[1] - 10) * 0.5);
    });

    var player = {
    	body: playerBody
    };
    theWorld.add(player);
    return player;
};
