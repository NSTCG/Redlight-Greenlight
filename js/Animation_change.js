WL.registerComponent(
    "retarget-animation",
    {
        danceAnimation: { type: WL.Type.Animation },
        gunshotAnimation: { type: WL.Type.Animation },
        dance2Animation: { type: WL.Type.Animation },
        bodyMeshObject: { type: WL.Type.Object },
    },
    {
        start: function () {
            this.limitflag=1;
            this.animationComponents = {
                "dance": this.object.getComponent('animation', 0),
                "dance2": this.object.getComponent('animation', 1),
                "gunshot": this.object.getComponent('animation', 2),
            }

            if (this.danceAnimation) {
                let mesh = this.bodyMeshObject.getComponent("mesh");

                this.danceAnimation = this.danceAnimation.retarget(mesh.skin);
                this.animationComponents["dance"].animation = this.danceAnimation;
                this.animationComponents["dance"].animation.playCount = 1;
                //this.animationComponents["dance"].play();

                this.dance2Animation = this.dance2Animation.retarget(mesh.skin);
                this.animationComponents["dance2"].animation = this.dance2Animation;
                this.animationComponents["dance2"].animation.playCount = 1;

                this.gunshotAnimation = this.gunshotAnimation.retarget(mesh.skin);
                this.animationComponents["gunshot"].animation = this.gunshotAnimation;
                this.animationComponents["gunshot"].animation.playCount = 1;
                this.lastPlayedAnimation = null;
            }
        },
        playAnimation: function (animationName) {
            if (this.lastPlayedAnimation == animationName) return;
            if (this.lastPlayedAnimation) {
                this.animationComponents[this.lastPlayedAnimation].stop();
            }
            this.lastPlayedAnimation = animationName;
            this.animationComponents[animationName].play();
        },
        update: function(){
            if(window.finished==1){
                this.playAnimation("dance");
            }
            if(window.playerdead==1){
                if(this.limitflag==1){
                    this.playAnimation("gunshot");
                    this.limitflag=0;
                }
                
                

            }

            if(window.deathtimer>2){
                this.animationComponents["gunshot"].stop();
            }
            
        }
    }
);