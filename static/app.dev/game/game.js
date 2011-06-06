/**
 * @author egli
 */

YUI({
    modules:  {
        app_table: {
            fullpath: 'app.'+APP.version+'/'+APP.name+'/js/app_table.js',
            requires: []
        },
        app_body: {
            fullpath: 'app.'+APP.version+'/'+APP.name+'/js/app_body.js',
            requires: []
        },        
        app_bar: {
            fullpath: 'app.'+APP.version+'/'+APP.name+'/js/app_bar.js',
            requires: []
        },
        app_ball: {
            fullpath: 'app.'+APP.version+'/'+APP.name+'/js/app_ball.js',
            requires: []
        }
    }
}).use('base','app_table','app_body','app_bar','app_ball', function(Y) {
    function init() {

        Y.one('.yui3-js-enabled').removeClass('yui3-js-enabled');
	Y.log('it is ready');
        
        Y.APP.table.init();
        
    }
    Y.on("domready", init);
});
