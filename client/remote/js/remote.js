(function() {
    'use strict';
    var peer = new Peer('remote', {
            key: '***PEERJS_API_KEY***'
        }),
        trigger = document.getElementById('trigger'),
        messageElement = document.getElementById('message'),
        triggerOn = false,
        conn = peer.connect('ui'),
        open = false,
        data = [0,0,0];

    console.log('connect');
    conn.on('open', function() {
        console.log('open');
        open = true;
    });

    trigger.addEventListener('touchstart', function () {
        triggerOn = true;
    });

    trigger.addEventListener('touchend', function () {
        messageElement.textContent = 'Force';
        var force = Math.sqrt(data[1]*data[1] + data[2]*data[2] + data[3]*data[3]);
        messageElement.textContent = 'Force: ' + force;
        if(open) {
            conn.send(['s', force, data[2]]);
        }
        triggerOn = false;
    });

    window.addEventListener('devicemotion', function(e) {
        var a = e.accelerationIncludingGravity;
        data = ['c', a.x, a.y, a.z];
    }, true);
    // setInterval(function () {
    //     if(open && !triggerOn) {
    //         conn.send(data);
    //     }
    // },1000/60);
}());
