YUI.add('game_pitch_graphics', function(Y) {
	Y.namespace('APP').PitchGraphics = function(config) {
		Y.APP.PitchAnimation.superclass.constructor.apply(this, arguments);
	};

	Y.extend(Y.APP.PitchGraphics, Y.Plugin.Base, {
		initializer: function() {
            this.widget = this.get("host");
			Y.log('PitchGraphics Plugin added');

            // Bind local methods and variables to widget
            // Check with YUI Patterns / Marco what would be the proper way to do this?
            this.widget._drawPitch = this._drawPitch;
            this._ball = this.widget._ball;
		},

        _drawPitch: function() {

            var colorLines = this.get('colorLines'),
                colorTurf = this.get('colorTurf'),
                colorTurfContrast = this.get('colorTurfContrast'),
                pitchWidth = this.get('pitchWidth'),
                pitchHeight = this.get('pitchHeight'),
                pitchOffsetX = this.get('pitchOffsetX'),
                pitchOffsetY = this.get('pitchOffsetY'),
                linesWidth = this.get('linesWidth'),
                OneYd = pitchHeight / 115; // One yard. Old Trafford is 115 yd long
            //create a graphic instance
            this._pitchGraphic = new Y.Graphic({
                autoSize: true,
                render: this.get('contentBox')
            });

            //create an ellipse with addShape
            var pitch = this._pitchGraphic.addShape({
                type: "rect",
                fill: {
                    color: colorTurf
                },
                stroke: {
                    weight: 0,
                    color: colorLines
                },
                width: pitchWidth,
                height: pitchHeight,
                x: pitchOffsetX,
                y: pitchOffsetY
            });

            var boundary = this._pitchGraphic.addShape({
                type: "rect",
                stroke: {
                    weight: linesWidth,
                    color: colorLines
                },
                width: pitchWidth - (2 * linesWidth),
                height: pitchHeight - (10 * linesWidth),
                x: pitchOffsetX + linesWidth,
                y: pitchOffsetY + (5 * linesWidth)
            });

            var centerCircle = this._pitchGraphic.addShape({
                type: "circle",
                radius: 10 * OneYd,
                stroke: {
                    weight: linesWidth,
                    color: colorLines
                },
                x: pitchOffsetX + (pitchWidth / 2) - 10 * OneYd,
                y: pitchOffsetY + (pitchHeight / 2) - 10 * OneYd
            });

            var halfWayLine = this._pitchGraphic.addShape({
                type: "path",
                stroke: {
                    weight: linesWidth,
                    color: colorLines
                }
            });
            halfWayLine.moveTo(pitchOffsetX + linesWidth, pitchOffsetY + (pitchHeight / 2));
            halfWayLine.lineTo(pitchOffsetX + pitchWidth - linesWidth, pitchOffsetY + (pitchHeight / 2));
            halfWayLine.end();

            var penaltyAreaHome = this._pitchGraphic.addShape({
                type: "path",
                stroke: {
                    weight: linesWidth,
                    color: colorLines
                }
            });
            penaltyAreaHome.moveTo(pitchOffsetX + (pitchWidth / 2) - (22 * OneYd), pitchOffsetY + pitchHeight - (5 * linesWidth));
            penaltyAreaHome.lineTo(pitchOffsetX + (pitchWidth / 2) - (22 * OneYd), pitchOffsetY + pitchHeight - (5 * linesWidth) - (18 * OneYd));
            penaltyAreaHome.lineTo(pitchOffsetX + (pitchWidth / 2) + (22 * OneYd), pitchOffsetY + pitchHeight - (5 * linesWidth) - (18 * OneYd));
            penaltyAreaHome.lineTo(pitchOffsetX + (pitchWidth / 2) + (22 * OneYd), pitchOffsetY + pitchHeight - (5 * linesWidth));
            penaltyAreaHome.end();

            var goalAreaHome = this._pitchGraphic.addShape({
                type: "path",
                stroke: {
                    weight: linesWidth,
                    color: colorLines
                }
            });
            goalAreaHome.moveTo(pitchOffsetX + (pitchWidth / 2) - (10 * OneYd), pitchOffsetY + pitchHeight - (5 * linesWidth));
            goalAreaHome.lineTo(pitchOffsetX + (pitchWidth / 2) - (10 * OneYd), pitchOffsetY + pitchHeight - (5 * linesWidth) - (6 * OneYd));
            goalAreaHome.lineTo(pitchOffsetX + (pitchWidth / 2) + (10 * OneYd), pitchOffsetY + pitchHeight - (5 * linesWidth) - (6 * OneYd));
            goalAreaHome.lineTo(pitchOffsetX + (pitchWidth / 2) + (10 * OneYd), pitchOffsetY + pitchHeight - (5 * linesWidth));
            goalAreaHome.end();

            var penaltyMarkHome = this._pitchGraphic.addShape({
                type: "circle",
                radius: linesWidth / 2,
                stroke: {
                    weight: linesWidth / 2,
                    color: colorLines
                },
                x: pitchOffsetX + (pitchWidth / 2) - linesWidth / 2,
                y: pitchOffsetY + pitchHeight - (5 * linesWidth) - (12 * OneYd) - linesWidth / 2
            });

            var penaltyAreaAway = this._pitchGraphic.addShape({
                type: "path",
                stroke: {
                    weight: linesWidth,
                    color: colorLines
                }
            });
            penaltyAreaAway.moveTo(pitchOffsetX + (pitchWidth / 2) - (22 * OneYd), pitchOffsetY + (5 * linesWidth));
            penaltyAreaAway.lineTo(pitchOffsetX + (pitchWidth / 2) - (22 * OneYd), pitchOffsetY + (5 * linesWidth) + (18 * OneYd));
            penaltyAreaAway.lineTo(pitchOffsetX + (pitchWidth / 2) + (22 * OneYd), pitchOffsetY + (5 * linesWidth) + (18 * OneYd));
            penaltyAreaAway.lineTo(pitchOffsetX + (pitchWidth / 2) + (22 * OneYd), pitchOffsetY + (5 * linesWidth));
            penaltyAreaAway.end();

            var goalAreaAway = this._pitchGraphic.addShape({
                type: "path",
                stroke: {
                    weight: linesWidth,
                    color: colorLines
                }
            });
            goalAreaAway.moveTo(pitchOffsetX + (pitchWidth / 2) - (10 * OneYd), pitchOffsetY + (5 * linesWidth));
            goalAreaAway.lineTo(pitchOffsetX + (pitchWidth / 2) - (10 * OneYd), pitchOffsetY + (5 * linesWidth) + (6 * OneYd));
            goalAreaAway.lineTo(pitchOffsetX + (pitchWidth / 2) + (10 * OneYd), pitchOffsetY + (5 * linesWidth) + (6 * OneYd));
            goalAreaAway.lineTo(pitchOffsetX + (pitchWidth / 2) + (10 * OneYd), pitchOffsetY + (5 * linesWidth));
            goalAreaAway.end();

            var penaltyMarkAway = this._pitchGraphic.addShape({
                type: "circle",
                radius: linesWidth / 2,
                stroke: {
                    weight: linesWidth / 2,
                    color: colorLines
                },
                x: pitchOffsetX + (pitchWidth / 2) - linesWidth / 2,
                y: pitchOffsetY + (5 * linesWidth) + (12 * OneYd) + linesWidth / 2
            });

            /*var ball = this._pitchGraphic.addShape({
                type: "circle",
                radius: this.get('ballSize') / 2,
                fill: {
                    color: colorLines
                },
                stroke: {
                    weight: 1,
                    color: colorLines
                },
                x: pitchOffsetX + 150,
                y: pitchOffsetY + 250
            });*/

        }




	}, {
		NAME: 'game_pitch_graphics',
		NS: 'PitchGraphics',
		ATTRS: {
			
		}
	});
}, '0.1', {
	requires: ['base', 'node'],
	skinnable: false
});