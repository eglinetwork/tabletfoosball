YUI.add('game_pitch_physics', function(Y) {
	Y.namespace('APP').PitchPhysics = function(config) {
		Y.APP.PitchPhysics.superclass.constructor.apply(this, arguments);
	};

	Y.extend(Y.APP.PitchPhysics, Y.Plugin.Base, {
		initializer: function() {
			Y.log('PitchPhysics Plugin added');
		},
		
		startEngine: function(intervall) {
			//Start Timer in intervall and check if any gameEvent happens
		},

		addUserEvent: function(e) {
			eventQueue.push(e);
		},

		_eventQueue : [],

		_handleCurrentTimestep : function() {
			
		}


	}, {
		NAME: 'game_pitch_physics',
		NS: 'PitchPhysics',
		ATTRS: {
			
		}
	});
}, '0.1', {
	requires: ['base', 'node'],
	skinnable: false
});