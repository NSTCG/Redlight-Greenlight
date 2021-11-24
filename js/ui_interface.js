WL.registerComponent('ui_interface', {
    //mesh_object :{type : WL.Type.Object},
}, {
    init: function() {
        
    },  
    start: function() {
        //console.log('start() with param', this.param);
    },
    update: function() {
        
        

        if(window.gamestart==1){
            if(this.object.getComponent("mesh")){
                this.object.getComponent("mesh").active=false;
            }
            if(this.object.getComponent("text")){
                this.object.getComponent("text").active=false;
            }
            
        }
        
    },
});
