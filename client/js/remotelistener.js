'use strict';
var peer = new Peer('ui', {
        key: '***PEERJS_API_KEY***'
    }),
    cameracontrol, triggercontrol;

console.log('listen for connection');
peer.on('connection', function(conn) {
    console.log('connection');
    conn.on('data', function(data) {
    	if(data[0] === 'c' && cameracontrol) {
    		cameracontrol(data);
    	} else if(data[0] === 's' && triggercontrol) {
    		triggercontrol(data);
    	}
    });
});
module.exports = {
	setCameracontrol: function (cc) {
		cameracontrol = cc;
	},
	setTriggercontrol: function (tc) {
		triggercontrol = tc;
	}
};
