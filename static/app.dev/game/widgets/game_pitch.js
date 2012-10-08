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
            //
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
            var myellipse = this._pitchGraphic.addShape({
                type: "rect",
                fill: {
                    color: "#00ff00"
                },
                stroke: {
                    weight: 2,
                    color: "#000000"
                },
                width: 150,
                height: 100,
                x: 0,
                y: 0
            });

        }

    }, {
        ATTRS: {

        }
    });

}, '0.1', {
    requires: ['base', 'node', 'widget', 'graphics'],
    skinnable: false
});