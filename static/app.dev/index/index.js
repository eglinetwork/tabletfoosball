/**
 * @author egli
 */

YUI().use('node', function(Y) {
    function init() {

        Y.one('.yui3-js-enabled').removeClass('yui3-js-enabled');

	Y.log('it is ready');
        
    }
    Y.on("domready", init);
});
