//import {vec3} from 'gl-matrix'; (sometimes this won't work on manual js import, in that case use the following)

//const vec3 = glMatrix.vec3;


/**
 * Basic movement with W/A/S/D keys.
 */
WL.registerComponent('wasd-manual', {
    /** Movement speed in m/s. */
    normal_speed: { type: WL.Type.Float, default: 0.1 },
    /**Accelerated speed in m/s. */
    accelerated_speed: { type: WL.Type.Float, default: 0.2 },
    /** Object of which the orientation is used to determine forward direction */
    headObject: { type: WL.Type.Object },

    avatar: { type: WL.Type.Object },
    /** Whether or not to restrict movement on the Y axis */
    restrictY: { type: WL.Type.Bool, default: false },

    //for cardboard 

    speed: { type: WL.Type.Float, default: 0.02 },          /** Movement speed in m/s. */
    starting_delay: {type: WL.Type.Float, default: 0.5},    /** how much time should we wait after the press to start movement */
    cardboard_camera: { type: WL.Type.Object } ,             /** select the eyeleft or eyeright (vr cameras) for this */
}, {
    init: function() {
        window.deathtimer=0;
        this.snapDegrees =10;
        this.speed=this.normal_speed;
        this.up = false;
        this.right = false;
        this.down = false;
        this.left = false;

        window.addEventListener('keydown', this.press.bind(this));
        window.addEventListener('keyup', this.release.bind(this));


        this.left_bound=7.05;
        this.right_bound=7.4;
        this.back_bound=7.1;
        this.front_bound=4.1;

        


    },

    start: function() {
        this.headObject = this.headObject || this.object;
    },

    update: function(dt) {


        //for limiting player 

        let position = this.object.pp_getPosition()
        if(position[2]>this.back_bound){
            
            position[2]=this.back_bound;
            this.object.pp_setPosition(position);
        }

        if(position[2]<-1*this.front_bound){
            
            position[2]=-1*this.front_bound;
            this.object.pp_setPosition(position);
        }

        if(position[0]>this.right_bound){
            
            position[0]=this.right_bound;
            this.object.pp_setPosition(position);
        }

        if(position[0]<-1*this.left_bound){
          
            position[0]=-1*this.left_bound;
            this.object.pp_setPosition(position);
        }

        const vec3 = glMatrix.vec3;

        let direction = [0, 0, 0];

        if (this.up) direction[2] -= 1.0;
        if (this.down) direction[2] += 1.0;
        if (this.left) direction[0] -= 1.0;
        if (this.right) direction[0] += 1.0;

        if (direction[0]<-4)direction[0]=-4;
        if (direction[2]<-4)direction[2]=-4;
        if (direction[0]>4)direction[0]=4;
        if (direction[2]>4)direction[2]=4;

        vec3.normalize(direction, direction);
        direction[0] *= this.speed;
        direction[2] *= this.speed;
        vec3.transformQuat(direction, direction, this.headObject.transformWorld);
        if (this.restrictY) direction[1] = 0;

        

        if (window.playerdead!=1 && window.gamestart!=0 ){
            //console.log("window.gamestart",window.gamestart);
            this.object.translate(direction);
            
        }
              

        if(window.finished==1){
            this.avatar.getComponent('animation').active=true;
        }
        

    },

    press: function(e) {
        
        //console.log("player dead = ",window.playerdead);
        //this.avatar.getComponent('animation').animation="run";
        if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */ ) {
            
            
            if (window.playerdead!=1){
                this.avatar.getComponent('animation').active=true;
                this.up = true
                window.playermove=1
            }
            

        } else if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */ ) {
            
            if (window.playerdead!=1){
                this.avatar.getComponent('animation').active=true;
                this.right = true
                window.playermove=1
            }

        } else if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */ ) {
            
            if (window.playerdead!=1){
                this.avatar.getComponent('animation').active=true;
                this.down = true
                window.playermove=1
            }
            
        } else if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */ ) {
            
            if (window.playerdead!=1){
                this.avatar.getComponent('animation').active=true;
                this.left = true
                window.playermove=1
            }
        }
        else if (e.keyCode === 16 /* increment_speed */  ) {
            
            if (window.playerdead!=1){
                this.avatar.getComponent('animation').active=true;
                this.speed=this.accelerated_speed
                window.playermove=1
            }
        } else if (e.keyCode === 13 /* increment_speed */  ) {

            window.gamestart=1;
            
        }

    },

    release: function(e) {
        
        if(window.finished!=0){
            if (window.playerdead!=1){
                this.avatar.getComponent('animation').active=false;
            }
        }
        
        
        //this.avatar.getComponent('animation').animation="run";
        if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */ ) {
            this.up = false
            window.playermove=0
            if (window.playerdead){
                //this.avatar.getComponent('animation').active=false;
            }
        } else if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */ ) {
            this.right = false
            window.playermove=0
            if (window.playerdead){
                //this.avatar.getComponent('animation').active=false;
            }

        } else if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */ ) {
            this.down = false
            window.playermove=0
            if (window.playerdead){
                //this.avatar.getComponent('animation').active=false;
            }

        } else if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */ ) {
            this.left = false
            window.playermove=0
            if (window.playerdead){
                //this.avatar.getComponent('animation').active=false;
            }

        }
        else if (e.keyCode === 16 /* reset_speed */  ) {
            this.speed=this.normal_speed
            window.playermove=0
            if (window.playerdead!=1){
                //this.avatar.getComponent('animation').active=false;
            }

        }
    },



});
