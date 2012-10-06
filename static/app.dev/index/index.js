/**
 * @author egli
 */

YUI({
    modules:  {
        socket_io: {
            fullpath: '/socket.io/socket.io.js',
            requires: []
        }
    }
}).use('base','node','socket_io', function(Y) {
    function init() {

        Y.one('.yui3-js-enabled').removeClass('yui3-js-enabled');

     
        
    }
    Y.on("domready", init);
});
