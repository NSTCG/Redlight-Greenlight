WL.registerComponent('pulsate', {
    scale_limit: {type: WL.Type.Float, default: 0.8},
}, {
    init: function() {
        this.scale=0;
        this.increase=1;
        this.decrease=0;
        this.scale=this.object.pp_getScale()[0]
        //this.scale_limit=this.object.pp_getScale()[0]+.1;
    },
    start: function() {
        
    },
    update: function(dt) {

        
        this.scale=this.object.pp_getScale()[0]
        //console.log(this.scale)
        if(this.increase==1){
            this.object.pp_scaleObject(1.01);
            if(this.scale>this.scale_limit+.26){
                this.increase=0;
                this.decrease=1;
            }
        }
        if(this.decrease==1){
            this.object.pp_scaleObject(0.99);
            if(this.scale<2-this.scale_limit-.26){
                this.increase=1;
                this.decrease=0;
            }
        }
        
    },
});
