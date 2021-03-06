/**
 * @author egli
 */

YUI({
    modules: {
        socket_io: {
            fullpath: '/socket.io/socket.io.js',
            requires: []
        }
    }
}).use('base', 'node', 'socket_io', function(Y) {
    function init() {

        Y.one('.yui3-js-enabled').removeClass('yui3-js-enabled');

        var socket = io.connect(window.origin);
        Y.one('#container').on('click', function(e) {
            socket.emit('clickEvent', {
                clickTime: new Date().getTime(),
                clientX: e.clientX,
                clientY: e.clientY
            });
        });

        socket.on('clickEvent', function(data) {
            var tripTime = new Date().getTime() - data.clickTime;
            Y.log('Trip time: ' + tripTime + 'ms');
            Y.one('.timelog').append('<p>Trip time: ' + tripTime + 'ms; Sender: '+data.sender+'</p>');
        });

        socket.emit('initEvent', {
            initTime: new Date().getTime(),
            initText: 'init of application index completed',
            winHeight: Y.one('#container').get('winHeight'),
            winWidth: Y.one('#container').get('winWidth')
        });

    }
    Y.on("domready", init);
});