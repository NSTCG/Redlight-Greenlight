WL.registerComponent('Movement_detection', {
    light_object :{type : WL.Type.Object},

}, {
    init: function() {    
      
      


      
      this.timer_load=0;
      
      
    },

    start: function() {
        
        this.timer_load=0;
        this.loaded=1;
        this.collider = this.object.getComponent('collision');
        this.objects = [];
        this.check = false;

        this.light=this.light_object.getComponent('light');
        //this.light.color.set([1,0,0,.02]);
        this.finished=0;
        
    },
    update: function(dt) {
      /**console.log("window.starting_exception ",window.starting_exception)
      console.log("window.playerdead",window.playerdead)
      console.log("window.finished",window.finished)
      console.log("window.cameramove",window.cameramove)
      console.log("window.playermove" ,window.playermove)
      console.log("window.gamestart",window.gamestart)
      console.log("window.iswatching",window.iswatching);
      console.log("window.rotate_flag",window.rotate_flag);
      console.log("*------------------------------------*")**/



        if(window.window.starting_exception=true){
          this.timer_load+=dt
        }
        //console.log("player move " , window.playermove)
        if(this.finished==1){
            this.light.color.set([0,1,0.14,.02]);

        }
        if(window.iswatching==true && this.timer_load>3){
          window.window.starting_exception=false;
          if (window.cameramove==1 || window.playermove==1){
            if(window.finished!=1){
              window.playerdead=1;
              //console.log("player is dead")
              //movement detection funtion
              
              //console.log("camera move ", window.cameramove,"player move ",window.playermove);
              
              //animation_change
            }
            
            
            

          }
          
        }
        if (window.cameramove==0){
          if(this.finished==0){
            
            
          }
          
        }
        if(window.playerdead==1){
          //red-color
          if(window.finished!=1){
            this.light.color.set([1,0,0,.02]);
          }
          
        }
       

        let collidingComps = this.collider.queryOverlaps();
        //console.log(collidingComps);
        for(let i = 0; i < collidingComps.length; ++i) {
          if(!this.check) {
            let collidingMesh = collidingComps[i].object.getComponent('mesh');
            
            
            this.finished=1;
            window.finished=1;
                
            this.objects.push(collidingComps[i]);
            this.check = true;
          }
        }
        if(collidingComps.length == 0) {
          this.check = false;
          for (var i = 0; i < this.objects.length; i++) {
            let startMesh = this.objects[i].object.getComponent('mesh');
            
           
            //this.light.color.set([1,1,1,.02]);

          }
          this.objects = [];
        }
      },
  });
  