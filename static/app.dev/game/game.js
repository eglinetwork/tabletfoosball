/**
 * @author egli
 */

YUI({
    modules: {
        socket_io: {
            fullpath: '/socket.io/socket.io.js',
            requires: []
        },
        game_pitch: {
            fullpath: '/app.' + APP.version + '/' + APP.name + '/widgets/game_pitch.js',
            requires: ['base', 'node', 'widget', 'graphics']
        },
        game_pitch_animation: {
            fullpath: '/app.' + APP.version + '/' + APP.name + '/widgets/game_pitch_animation.js',
            requires: ['base', 'node', 'plugin']
        },
        game_pitch_physics: {
            fullpath: '/app.' + APP.version + '/' + APP.name + '/widgets/game_pitch_physics.js',
            requires: ['base', 'node', 'plugin']
        }
    }
}).use('base', 'node', 'socket_io', 'game_pitch', 'game_pitch_animation', 'game_pitch_physics', function(Y) {
    function init() {

        Y.one('.yui3-js-enabled').removeClass('yui3-js-enabled');

        Y.namespace('APP').pitch = new Y.APP.Pitch({
            srcNode: "#pitch",
            plugins: [
                Y.APP.PitchPhysics,
                Y.APP.PitchAnimation
            ]
        });
        Y.APP.pitch.render();
        Y.after("windowresize", Y.APP.pitch.resize());

        var socket = io.connect(window.origin);
        socket.emit('initEvent', {
            initTime: new Date().getTime(),
            initText: 'init of application game completed',
            winHeight: Y.one('#stadium').get('winHeight'),
            winWidth: Y.one('#stadium').get('winWidth')
        });

    }
    Y.on("domready", init);
});