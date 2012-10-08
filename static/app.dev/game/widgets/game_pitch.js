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
                width: 320,
                height: 500,
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
            }
        }
    });

}, '0.1', {
    requires: ['base', 'node', 'widget', 'graphics'],
    skinnable: false
});