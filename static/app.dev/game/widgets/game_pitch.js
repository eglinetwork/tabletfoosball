/**
 * @author egli@intelliact.ch
 */

YUI.add('game_pitch', function(Y) {
    Y.namespace('APP').Pitch = Y.Base.create('game_pitch', Y.Widget, [], {

        //
        // WIDGET FUNCTIONS
        //
        initializer: function() {
            //
        },

        destructor: function() {
            this._pitchGraphic.destroy();
        },

        renderUI: function() {
            this._setPitchSize();
            this._drawPitch();
        },

        bindUI: function() {
            //
        },

        syncUI: function() {
            //
        },

        //
        // PUBLIC FUNCTIONS
        //
        resize: function() {
            this._pitchGraphic.destroy();
            this._setPitchSize();
            this._drawPitch();
        },

        //
        // PRRIVATE VARIABLES
        //
        _pitchGraphic: null,

        //
        // PRRIVATE FUNCTIONS
        //
        _drawPitch: function() {
            //create a graphic instance
            this._pitchGraphic = new Y.Graphic({
                autoSize: true,
                render: this.get('contentBox')
            });

            //create an ellipse with addShape
            var pitch = this._pitchGraphic.addShape({
                type: "rect",
                fill: {
                    color: this.get('colorTurf')
                },
                stroke: {
                    weight: 0,
                    color: this.get('colorLines')
                },
                width: this.get('pitchW'),
                height: this.get('pitchH'),
                x: 0,
                y: 0
            });

            var centerCircle = this._pitchGraphic.addShape({
                type: "circle",
                radius: 50,
                fill: {
                    color: this.get('colorTurf')
                },
                stroke: {
                    weight: 2,
                    color: this.get('colorLines')
                },
                x: 110,
                y: 200
            });

        },

        _setPitchSize: function() {
            this.set('pitchW',this.get('contentBox').get('winWidth'));
            this.set('pitchH',this.get('contentBox').get('winHeight'));
        }

    }, {
        ATTRS: {
            colorLines: {
                value: "#ffffff",
                validator: Y.Lang.isString
            },
            colorTurf: {
                value: "#00ff00",
                validator: Y.Lang.isString
            },
            colorTurfContrast: {
                value: "#55ff55",
                validator: Y.Lang.isString
            },
            pitchW: {
                value: 360,
                validator: Y.Lang.isNumber
            },
            pitchH: {
                value: 567,
                validator: Y.Lang.isNumber
            }
        }
    });

}, '0.1', {
    requires: ['base', 'node', 'widget', 'graphics'],
    skinnable: false
});