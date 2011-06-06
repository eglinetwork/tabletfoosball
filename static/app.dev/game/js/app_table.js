/**
 * @author egli
 */

YUI.add('app_table', function(Y) {
 
    // Private functions and vars
    
    // Declare all class variables
    var bars,ball,freeSpaceX,freeSpaceY,scale,lastUpdateTime,deltaT,iStep;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
  
    // Variables used for collision detection
    var collisionX1,collisionX2,collisionY1,collisionY2;
    
    // Privat functions
    /**
     * Draw this component
     *
     * @method _draw
     * @return void
     */
    var _draw = function() {

        ctx.save();

        ctx.scale(scale,scale);
        ctx.translate(freeSpaceX,freeSpaceY);
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect (-freeSpaceX, 0, freeSpaceX, that.sizeY);
        ctx.fillRect (that.sizeX, 0, freeSpaceX, that.sizeY);
        ctx.fillStyle = "rgb(0,100,0)";
        ctx.fillRect (0, 0, that.sizeX, that.sizeY);
        ctx.translate(that.sizeX/2,that.sizeY/2);
        // setup the line style
        ctx.strokeStyle = '#fa00ff';
        ctx.lineWidth = 4;
        for (iBar=0;iBar<8;iBar++) {
            bars[iBar].draw();
        } 
        ball.draw();
        ctx.restore();
        ctx.restore(); // For unknown reason we need to restore one more
    },
    _time = Date.now || function(){
        return +new Date;
    },
    _init = function() {
        that.sizeX=500;
        that.sizeY=1000;
        freeSpaceX=400;
        freeSpaceY=100;
        scale=0.5;
        deltaT=0.01;
        ball = new SOCCER.Ball(that);
        bars = [];
        for (iBar=0;iBar<8;iBar++) {
            bars[iBar] = new SOCCER.Bar(iBar,that);
        } 
        that.resetState();
        //resize canvas
        canvas.height = scale * (that.sizeY + 2*freeSpaceY);
        canvas.width  = scale * (that.sizeX + 2*freeSpaceX);
    
        _initCollision();
    },
    _startSimulation = function()
    {
        // for debugging only
        this.timer = setInterval((function () {
            _step();
        }), 100);
    },
    _getTime = function() {
        return _time();
    },
    _step = function()
    {
        // for debugging only
        that.iStep++;
        var time = _getTime()/1000.0; // seconds
        //clearTimeout(this.timer);
        _runStateToTime(time);
        _draw();
    },
    _runStateToTime = function(time) {
        var handleCollision;
        var iBar,iLoop,numLoopMax=1000;
        if (lastUpdateTime == undefined) {
            lastUpdateTime=time;
        }
        deltaT=time-lastUpdateTime;
        for (iBar=0;iBar<8;iBar++) {
            bars[iBar].prepareMotion(deltaT);
        }
        ball.prepareMotion(deltaT);
        for (iLoop=0;iLoop<numLoopMax;iLoop++) { // the loop limit should never be reached, otherwise, the design should be corrected
            _updateCollision(deltaT);
            if (that.handleCollision !== _noCollision) {
                that.handleCollision(that.minFractionToCollision);
            }
            else {
                break;
            }
        }
        lastUpdateTime=time;
    },
    _initCollision = function() {
        var radius = ball.getRadius()
        collisionX1=radius-that.sizeX/2;
        collisionX2=that.sizeX/2-radius;
        collisionY1=radius-that.sizeY/2;
        collisionY2=that.sizeY/2-radius;
    },
    _noCollision = function() {},
    // detect collision and update state of ball
    _updateCollision = function(deltaT) {
        var iBar,handleCollision=_noCollision;
        var fractionToCollision;
        that.handleCollision=_noCollision;
        that.minFractionToCollision=1;
        var motion = ball.getDesiredMotion();
        var x1=motion[0],y1=motion[1],x2=motion[2],y2=motion[3];
        if (x2<collisionX1 || x2>collisionX2 || y2<collisionY1 || y2>collisionY2) {
            // new point is outside, collision
            if (x2<collisionX1) {
                fractionToCollision = (collisionX1-x2) / (x1-x2);
                if (that.minFractionToCollision>fractionToCollision) {
                    that.handleCollision = ball.handleCollisionWithTableX1;
                    that.minFractionToCollision = fractionToCollision;
                }
            } else if (x2>collisionX2) {
                fractionToCollision = (x2-collisionX2) / (x2-x1);
                if (that.minFractionToCollision>fractionToCollision) {
                    that.handleCollision = ball.handleCollisionWithTableX2;
                    that.minFractionToCollision = fractionToCollision;
                }
            }
            if (y2<collisionY1) {
                fractionToCollision = (collisionY1-y2) / (y1-y2);
                if (that.minFractionToCollision>fractionToCollision) {
                    that.handleCollision = ball.handleCollisionWithTableY1;
                    that.minFractionToCollision = fractionToCollision;
                }
            } else if (y2>collisionY2) {
                fractionToCollision = (y2-collisionY2) / (y2-y1);
                if (that.minFractionToCollision>fractionToCollision) {
                    that.handleCollision = ball.handleCollisionWithTableY2;
                    that.minFractionToCollision = fractionToCollision;
                }
            }
        }
        for (iBar=0;iBar<8;iBar++) {
            bars[iBar].updateCollision(that,deltaT);
        }
    }

    Y.namespace('APP');
    Y.APP.table = {
        init : function(){
            _init();
            _draw();
            _startSimulation();
        },
        /**
         * Reset component to its initial state
         *
         * @method resetState
         * @return void
         */
        resetState : function() {
            for (iBar=0;iBar<8;iBar++) {
                bars[iBar].resetState();
            }
            that.iStep=0;
        },
        getBall : function() {
            return ball;
        },
        /**
         * Handle an event (graphics update or interaction)
         * FIXME. not yet implemented
         *
         * @method draw
         * @return void
         */
        handleEvent : function(event) {
        /*var bar;
        runStateToTimeInSteps(event.time);
        if (event.type=="Graphics")  {
          updateGraphics();
        }
        else {
          bar = getBar(event);
          bar.updateByEvent(event);
        }*/
        },
        getCollisionInfoX1 : function()  {
            return collisionX1;
        },
        getCollisionInfoX2 : function()  {
            return collisionX2;
        },
        getCollisionInfoY1 : function()  {
            return collisionY1;
        },
        getCollisionInfoY2 : function()  {
            return collisionY2;
        },
        playWallBallCollisionSound : function() {
        //FIXME
        },
        playBodyBallCollisionSound : function() {
        //FIXME
        },
        playWallBarCollisionSound : function() {
        //FIXME
        },
        playGoalSound : function() {
        //FIXME
        }
    }
}, '0.0.1' /* module version */, {
    requires: []
});

