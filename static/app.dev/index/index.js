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

        var socket = io.connect('http://localhost:'+APP.port);

        Y.one('#container').on('click', function(e) {
            socket.emit('clickEvent', {
                clickTime: new Date().getTime(),
                clientX: e.clientX,
                clientY: e.clientY
            });
        });


        socket.on('clickEvent', function(data) {
            var tripTime = new Date().getTime() - data.clickTime;
            console.log('Trip time: '+tripTime+'ms');
            Y.one('.timelog').append('<p>Trip time: '+tripTime+'ms</p>');

        });

    }
    Y.on("domready", init);
});