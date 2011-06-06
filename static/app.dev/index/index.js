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

        Y.log('it is ready');
        
        var socket = new io.Socket('localhost',{
            port: APP.port
        });
        socket.connect();
        
        socket.on('message', function(data){
            var timestamp = new Date();
            Y.log('got some data at '+timestamp.getTime());
            Y.log(data);
        });
        
        Y.one('#send-message').on("click",function(){
            var timestamp = new Date();
            var messageText = document.getElementById('message-text').value + ' - ' + timestamp.getTime();
            Y.log(messageText);
            socket.send(messageText);
        })
        
    }
    Y.on("domready", init);
});
