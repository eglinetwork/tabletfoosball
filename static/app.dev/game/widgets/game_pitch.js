/**
 * @author egli@intelliact.ch
 */

YUI.add('game_pitch', function(Y) {
    Y.namespace('APP').Pitch = Y.Base.create('game_pitch', Y.Widget, [], {

        //
        // WIDGET FUNCTIONS
        //
        initializer: function() {
            // Instantiate Modules
        },

        destructor: function() {
            this._pitchGraphic.destroy();
        },

        renderUI: function() {
            // For better performance make game dom elements accessable
            this._ball = Y.one('#ball');
            this._barDefenseAway = Y.one('.bar.defense.away');
            this._barDefenseHome = Y.one('.bar.defense.home');
            this._setPitchParams();
            this._drawPitch();
            this._setKickoffPositions();
        },

        bindUI: function() {
            // Implement Event controller
            barDefenseHome = Y.one('.bar.defense.home');
            barDefenseHome.on('click', function () {
               
            });
        },

        syncUI: function() {
            //
        },

        //
        // PUBLIC FUNCTIONS
        //
        resize: function() {
            this._pitchGraphic.destroy();
            this._setPitchParams();
            this._drawPitch();
        },

        //
        // PRRIVATE VARIABLES
        //
        _pitchGraphic: null,

        //
        // PRRIVATE FUNCTIONS
        //

        _drawPitch : function() {},

       _setKickoffPositions: function() {
            var pitchWidth = this.get('pitchWidth'),
                pitchHeight = this.get('pitchHeight'),
                pitchOffsetX = this.get('pitchOffsetX'),
                pitchOffsetY = this.get('pitchOffsetY');
            this._ball.setXY([pitchOffsetX + pitchWidth/2 - this._ball.get('clientWidth')/2, pitchOffsetY + pitchHeight/2 -this._ball.get('clientWidth')/2]);
            this._barDefenseAway.setXY([pitchOffsetX + pitchWidth/2- this._barDefenseAway.get('clientWidth')/2, pitchOffsetY]);
            this._barDefenseHome.setXY([pitchOffsetX + pitchWidth/2- this._barDefenseHome.get('clientWidth')/2, pitchOffsetY + pitchHeight - this._barDefenseHome.get('clientHeight')]);
        },

        _setPitchParams: function() {
            var winWidth = this.get('contentBox').get('winWidth'),
                winHeight = this.get('contentBox').get('winHeight'),
                pitchWidth, pitchHeight, pitchOffsetX, pitchOffsetY, linesWidth, ballSize;

            if(winHeight > 1.6 * winWidth) {
                pitchWidth = winWidth;
                pitchHeight = winWidth * 1.6;
                pitchOffsetX = 0;
                pitchOffsetY = (winHeight - pitchHeight) / 2;
            } else {
                pitchWidth = winHeight / 1.6;
                pitchHeight = winHeight;
                pitchOffsetX = (winWidth - pitchWidth) / 2;
                pitchOffsetY = 0;
            }
            linesWidth = Math.ceil(pitchHeight / 200);
            ballSize = Math.ceil(pitchHeight / 45);

            this.set('pitchWidth', pitchWidth);
            this.set('pitchHeight', pitchHeight);
            this.set('pitchOffsetX', pitchOffsetX);
            this.set('pitchOffsetY', pitchOffsetY);
            this.set('linesWidth', linesWidth);
            this.set('ballSize', ballSize);
        }

    }, {
        ATTRS: {
            colorLines: {
                value: "#ffffff",
                validator: Y.Lang.isString
            },
            colorTurf: {
                value: "#228B22",
                validator: Y.Lang.isString
            },
            colorTurfContrast: {
                value: "#55ff55",
                validator: Y.Lang.isString
            },
            pitchWidth: {
                value: 360,
                validator: Y.Lang.isNumber
            },
            pitchHeight: {
                value: 567,
                validator: Y.Lang.isNumber
            },
            pitchOffsetX: {
                value: 0,
                validator: Y.Lang.isNumber
            },
            pitchOffsetY: {
                value: 0,
                validator: Y.Lang.isNumber
            },
            linesWidth: {
                value: 2,
                validator: Y.Lang.isNumber
            },
            ballSize: {
                value: 5,
                validator: Y.Lang.isNumber
            }
        }
    });

}, '0.1', {
    requires: ['base', 'node', 'widget', 'graphics'],
    skinnable: false
});