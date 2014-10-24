'use strict';
var defaultMaterial = require('./material').getDefault();

function createLight() {
    var light = new THREE.SpotLight(0xffffff);
    light.position.set(10, 30, 20);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;

    light.shadowCameraNear = 20;
    light.shadowCameraFar = 50; //camera.far;
    light.shadowCameraFov = 40;

    light.shadowMapBias = 0.1;
    light.shadowMapDarkness = 0.7;
    light.shadowMapWidth = 2 * 512;
    light.shadowMapHeight = 2 * 512;

    return light;
}

function createRenderer(color) {
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(color, 1);

    document.body.appendChild(renderer.domElement);

    return renderer;
}


module.exports = function createWorld(game) {
    var world = new CANNON.World(),
        solver = new CANNON.GSSolver(),
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
        scene = new THREE.Scene(),
        fog = new THREE.Fog(0x000000, 0, 500),
        ambient = new THREE.AmbientLight(0x111111),
        renderer = createRenderer(fog.color),
        items = [];



    world.quatNormalizeSkip = 0;
    world.quatNormalizeFast = false;
    world.defaultContactMaterial.contactEquationStiffness = 1e9;
    world.defaultContactMaterial.contactEquationRegularizationTime = 4;
    world.gravity.set(0, -9.8, 0);
    world.broadphase = new CANNON.NaiveBroadphase();


    //Solver stuff
    solver.iterations = 7;
    solver.tolerance = 0.1;
    var split = true;
    if (split) {
        world.solver = new CANNON.SplitSolver(solver);
    } else {
        world.solver = solver;
    }
    //world.solver.iterations = 20;

    var physicsContactMaterial = new CANNON.ContactMaterial(defaultMaterial.physical,
        defaultMaterial.physical, {
            friction: 0.3,
            restitution: 0.2
        }
    );
    // We must add the contact materials to the world
    world.addContactMaterial(physicsContactMaterial);


    //THREE.ColorUtils.adjustHSV(material.color, 0, 0, 0.9);
    scene.fog = fog;
    scene.add(ambient);
    scene.add(createLight());


    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);

    var dt = 1 / 60;

    var w = {
        getCamera: function() {
            return camera;
        },
        addContactMaterial: function(m1, m2, options) {
            var physicsContactMaterial = new CANNON.ContactMaterial(m1,
                m2,
                options
            );
            world.addContactMaterial(physicsContactMaterial);
            return w;
        },
        addPointToPointConstraint: function(body1, v1, body2, v2) {
            var c = new CANNON.PointToPointConstraint(body1.body, new CANNON.Vec3(v1.x, v1.y, v1.z), body2.body, new CANNON.Vec3(v2.x, v2.y, v2.z));
            world.addConstraint(c);
            return w;
        },
        addHingeConstraint: function(body1, body2, options) {
            var c = new CANNON.HingeConstraint(body1.body, body2.body, options);
            world.addConstraint(c);
            return w;
        },
        getScene: function() {
            return scene;
        },
        remove: function(item) {
            setTimeout(function() {
                if (item.body) {
                    world.remove(item.body);
                }
                if (item.view) {
                    scene.remove(item.view);
                }
                if (item.render) {
                    var index = items.indexOf(item);
                    items.splice(index, 1);
                }
            }, 0);
            return w;
        },
        add: function(item) {
            if (item.body) {
                world.add(item.body);
            }
            if (item.view) {
                scene.add(item.view);
            }
            if (item.render) {
                items.push(item);
            }
            return w;
        },
        render: function() {
            if (game.enabled) {
                world.step(dt);
                items.forEach(function(item) {
                    item.render();
                });
            }
            renderer.render(scene, camera);
        }
    };
    return w;
};
