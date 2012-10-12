YUI.add('game_pitch_physics', function(Y) {
	Y.namespace('APP').PitchPhysics = function(config) {
		Y.APP.PitchPhysics.superclass.constructor.apply(this, arguments);
	};

	Y.extend(Y.APP.PitchPhysics, Y.Plugin.Base, {
		initializer: function() {
			Y.log('PitchPhysics Plugin added');
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