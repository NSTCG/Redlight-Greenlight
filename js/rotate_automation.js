WL.registerComponent('rotate_automation', {
    
}, {
    init: function() {
        console.log('init() with param', this.param);
        this.rot=[0 , 0, 0];
        window.rotate_flag=true;
       
        this.timer=0;
        this.timer_2=0

        //window.addEventListener('keydown', this.press.bind(this));
    },
    start: function() {
        //console.log('start() with param', this.param);
        
    },
    update: function(dt) {
        
        if(window.finished!=1 && window.playerdead!=1 && window.gamestart==1){
                    //console.log(this.timer)
        //swconsole.log(this.object.pp_getRotation()[0],this.object.pp_getRotation()[1],this.object.pp_getRotation()[2])
        if (window.rotate_flag==true){
            if (this.timer < (.5)){
                this.timer+=dt
                
                this.object.rotateAxisAngleDeg([0, 1, 0], dt* 360)
                

            }
            else{
                if(this.object.pp_getRotation()[0]>-90 ){
                    this.object.pp_setRotationWorld([0 , 0, 0]);
                    this.iswatching=true;
                    window.iswatching=true;

                }
                else{
                    this.object.pp_setRotationWorld([0 , 180, 0]);
                    this.iswatching=false;
                    window.iswatching=false;
                }
                 
                window.rotate_flag=false;
            }
        }


        if (this.timer_2 >(Math.random() * (7-2)+2)){
            this.rotate()
            this.timer_2=0;
        }
        this.timer_2+=dt;
        
        
        if(this.iswatching=true && window.starting_exception==false){
            this.detect_movement();
        }
        if(window.starting_exception=true){
            window.starting_exception=false
        }
        
        }

    },

    rotate: function(){
        this.timer=0;
        window.rotate_flag=!window.rotate_flag;
        //console.log("timer : " + this.timer);
        //console.log("flag : " + window.rotate_flag);
        
    },

    detect_movement: function(){
        //console.log("test");

    }


});


