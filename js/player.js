WL.registerComponent('player', {
    avatar: { type: WL.Type.Object },
   
}, 

{
    init: function(){
        this.x=0;
        this.y=0;
        this.z=0;


        this.previous_rot=this.object.pp_getRotation([]);

    },
    update: function(dt) {
        let rot = this.object.pp_getRotation([]);
        rot[0]=90;
        rot[1]+=180;
        rot[2]=0;
        if(rot){
            this.avatar.pp_setRotationWorld(rot); 
        }
        
        if(this.previous_rot!=rot){
            this.x=this.previous_rot[0]-rot[0];
            this.y=this.previous_rot[1]-rot[1];
            this.z=this.previous_rot[2]-rot[2];
            //console.log("rotation change :  " ,this.x,this.y,this.z);
            this.previous_rot=rot

            if(this.x<0){
                this.x*=-1
            }
            if(this.y<0){
                this.y*=-1
            }
            if(this.z<0){
                this.z*=-1
            }

            if (this.x>.3 || this.y>.3 || this.z>.3){
                window.cameramove=1;
            }
            else{
                window.cameramove=0;
            }
        }
        
    },
    
});

