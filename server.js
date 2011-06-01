
//setup Dependencies
//require(__dirname + "/lib/setup").ext( __dirname + "/lib").ext( __dirname + "/lib/express/support");
var connect = require('connect')
, express = require('express')
, sys = require('sys')
, conf = require('node-config');


conf.initConfig(
    function(err) {
        if(err) {
            sys.log('Unable to init the config: ' + err); 
            return;
        }

        // Config loaded, can do those things now

        //Setup Express
        var app = express.createServer( );
        
        // Register ejs as .html
        app.register('.html', require('ejs'));
        app.set('view engine', 'html');
        app.use(connect.bodyDecoder());
        app.use(connect.staticProvider({
            root: __dirname + '/static', 
            cache: true, 
            maxAge: 10368000000
        }));
        app.use(app.router);

        //setup the errors
        app.error(function(err, req, res, next){
            if (err instanceof NotFound) {
                res.render('404', {     
                    title : '404 - Not Found' ,
                    app_version : conf.app.version ,
                    app_name : 'error' ,
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


        ///////////////////////////////////////////
        //              Routes                   //
        ///////////////////////////////////////////

        /////// ADD ALL THE ROUTES HERE  /////////

        app.get('/', function(req,res){
            res.render('index', {
                title : 'Tablet Foosball',
                app_version : conf.app.version,
                app_name : 'index',
                description: 'Index',
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
    });


function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


