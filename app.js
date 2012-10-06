var express = require('express');
var app = module.exports = express();


conf = {
    port: 8081,
    analyticssiteid: 'UA-XXXXXXXX-X',
    app: {
        version: 'dev'
    },
    jslib: {
        yui: {
            version: '3.7.2'
        }
    }
};


if(conf.env == 'development') {
    conf.app.version = 'dev';
}

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});
app.use(express.static(__dirname + '/static', {
    maxAge: conf.maxAge
}));

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

/////// ROUTES /////////
app.get('/', function(req, res) {
    res.render('index', {
        title: 'TabletFoosball',
        app_version: conf.app.version,
        app_name: 'index',
        app_port : conf.port,
        description: 'A fooball game for touch devices. Play table football, also known as fussball, foosball or kicker, on your favourite touch device.',
        author: 'Marco Egli, Felix Nyffenegger, Martin Bichsel',
        analyticssiteid: conf.analyticssiteid,
        jslib_yui_version: conf.jslib.yui.version
    });
});


app.get('/*', function(req, res) {
    console.log(req);
    res.send(404, 'Not Found!');
});

app.listen(conf.port);
console.log('Listening on port:' + conf.port);