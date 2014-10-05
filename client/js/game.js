'use strict';
var instructionsCtrl = require('./instructions'),
    createWorld = require('./world'),
    createFloor = require('./floor'),
    createPlayer = require('./player'),
    createWall = require('./wall'),
    createBasket = require('./basket'),
    createPlates = require('./plates'),
    // createGlassbox = require('./glassbox'),
    // createBoxShape = require('./boxshape'),
    // createBody = require('./body'),
    createPointerLockControls = require('./pointerlockcontrols'),
    game = {
        enabled: false
    },
    world = createWorld(game);

instructionsCtrl(game);

//add floor
createFloor(world);

//add wall
world.add(createWall(0, 2.5, -10));

//glass box
// var n = 2;
// while(n--){
//     createGlassbox(world, -9, n+0.5, -3);    
// }

//Constraint test
// var boxshape = createBoxShape(1, 1, 1);
// var b1 = createBody(boxshape,{mass: 1, x: 5, y: 1, z: -3});
// var b2 = createBody(boxshape,{mass: 1, x: 5, y: 1, z: 0});
// world.add(b1)
//     .add(b2)
//     .addHingeConstraint(b1, b2, {});

//add basket
createBasket(world);

//add player
var player = createPlayer(game, world);

var controls = createPointerLockControls(game, world.getCamera(), player.body);
world.getScene().add(controls.getObject());

// Add linked boxes
createPlates(world, 8, 4, -10);
createPlates(world, -8, 4, -10);

var time = Date.now();

function animate() {
    requestAnimationFrame(animate);
    controls.update(Date.now() - time);
    world.render();
    time = Date.now();
}

animate();
