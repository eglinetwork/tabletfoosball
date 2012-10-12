YUI.add('game_pitch_animation', function(Y) {
	Y.namespace('APP').PitchAnimation = function(config) {
		Y.APP.PitchAnimation.superclass.constructor.apply(this, arguments);
	};

	Y.extend(Y.APP.PitchAnimation, Y.Plugin.Base, {
		initializer: function() {
			Y.log('PitchAnimation Plugin added');
		}
	}, {
		NAME: 'game_pitch_animation',
		NS: 'PitchAnimation',
		ATTRS: {
			
		}
	});
}, '0.1', {
	requires: ['base', 'node'],
	skinnable: false
});