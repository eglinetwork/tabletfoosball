
//setup Dependencies
var express = require('express'),
sys = require('sys'),
conf = require('node-config'),
io = require('socket.io');



conf.initConfig(
    function(err) {
        if(err) {
            sys.log('Unable to init the config: ' + err); 
            return;
        }

        // Config loaded, can do those things now

        //Setup Express
        var app = express.createServer();

        
        // Register ejs as .html
        app.register('.html', require('ejs'));
        app.set('view engine', 'html');
        
        app.configure(function(){
            app.use(express.logger('\x1b[33m:method\x1b[0m \x1b[32m:url\x1b[0m :response-time'));
            app.use(express.bodyParser());
            app.use(express.methodOverride());
            app.use(express.cookieParser());
            app.use(express.session({
                secret: 'cmw9dnauducvaj'
            }));
            app.use(express.static(__dirname + '/static', {
                maxAge: conf.maxAge
            }));
            app.use(app.router);
            app.use(express.errorHandler({
                dumpExceptions: true, 
                showStack: true
            }));
        });

        //setup the errors
        app.error(function(err, req, res, next){
            if (err instanceof NotFound) {
                res.render('404', {     
                    title : '404 - Not Found' ,
                    app_version : conf.app.version ,
                    app_name : 'error',
                    app_port : port,
                    description: '404 - Not Found' ,
                    author: '' ,
                    analyticssiteid: conf.analyticssiteid,
                    jslib_yui_version: conf.jslib.yui.version
                });
            } else {
                res.render('500', {
                    title : '500 - The Server Encountered an Error',
                    app_version : conf.app.version,
                    app_name : 'error',
                    app_port : port,
                    description: '500 - The Server Encountered an Error',
                    author: '',
                    analyticssiteid: conf.analyticssiteid,
                    jslib_yui_version: conf.jslib.yui.version,
                    error: {
                        error : err
                    } 
                });
            }
        });

        /////// ROUTES                   /////////
        /////// ADD ALL THE ROUTES HERE  /////////

        app.get('/', function(req,res){
            res.render('index', {
                title : 'Tablet Foosball',
                app_version : conf.app.version,
                app_name : 'index',
                app_port : port,
                description: 'Index',
                author: 'Marco Egli, Felix Nyffenegger, Martin Bichsel',
                analyticssiteid: conf.analyticssiteid,
                jslib_yui_version: conf.jslib.yui.version
            });
        });

        app.get('/game', function(req,res){
            res.render('game', {
                title : 'Tablet Foosball - Game',
                app_version : conf.app.version,
                app_name : 'game',
                app_port : port,
                description: 'Game',
                author: 'Marco Egli, Felix Nyffenegger, Martin Bichsel',
                analyticssiteid: conf.analyticssiteid,
                jslib_yui_version: conf.jslib.yui.version
            });
        });

        //A Route for Creating a 500 Error (Useful to keep around)
        app.get('/500', function(req, res){
            throw new Error('This is a 500 Error');
        });

        //The 404 Route (ALWAYS Keep this as the last route)
        app.get('/*', function(req, res){
            throw new NotFound;
        });

        var port = conf.port;
        app.listen(port);
        console.log('Listening on port:' + port );
        
        // socket.io, I choose you
        var socket = io.listen(app),
        buffer = [];
    
        socket.on('connection', function(client){
            client.send({
                buffer: buffer
            });
            client.broadcast({
                announcement: client.sessionId + ' connected'
            });
     
            client.on('message', function(message){
                var msg = {
                    message: [client.sessionId, message]
                };
                buffer.push(msg);
                if (buffer.length > 15) buffer.shift();
                client.broadcast(msg);
            });
    
            client.on('disconnect', function(){
                client.broadcast({
                    announcement: client.sessionId + ' disconnected'
                });
            });
        });
        
    });


function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


