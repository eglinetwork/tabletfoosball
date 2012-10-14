var uuid = require('node-uuid');

var init = function(req) {
		var playerId;
		console.log(req.session);
		if(req.session.playerId) {
			playerId = req.session.playerId;
		} else {
			playerId = uuid.v4();
			req.session.playerId = playerId;
		}
		return playerId;
	};


exports.init = init;