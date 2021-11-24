WL.registerComponent('y-restrict', {
    player: { type: WL.Type.Object },
}, {
    init: function() {
        this.height=-0;
        
    },
    start: function() {
        
    },
    update: function(dt) {
          //for limiting player 

          let position = this.object.pp_getPosition()
          //console.log(position);
          if(position[1]<this.height){
              position[2]+=(position[1]-this.height)/17;
              position[1]=this.height;
              this.object.pp_setPosition(position);
          }

          if(position[1]>this.height){
            position[2]-=(position[1]-this.height)/10;
            position[1]=this.height;
            this.object.pp_setPosition(position);
        }

        
        let position2 = this.player.pp_getPosition()
        position[2]=position2[2]-1;
        position[1]=position2[1]-1;
        
        //this.object.pp_setPosition(position);
    },
});
