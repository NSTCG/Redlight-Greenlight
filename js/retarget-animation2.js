WL.registerComponent(
    "retarget-animation2",
    {
        runAnimation: { type: WL.Type.Animation },
        gunshotAnimation: { type: WL.Type.Animation },
        danceAnimation: { type: WL.Type.Animation },
        bodyMeshObject: { type: WL.Type.Object },
    },
    {
        start: function () {
            window.deathtimer=0;
            window.finishtimer=0;
            
            this.animation_complete=0;

            this.animationComponents = {
                "ani_main": this.object.getComponent('animation', 0),

            }

            if (this.runAnimation) {
                this.mesh = this.bodyMeshObject.getComponent("mesh");

                //this.runAnimation = this.runAnimation.retarget(this.mesh.skin);
                this.animationComponents["ani_main"].animation = this.runAnimation;
                this.animationComponents["ani_main"].animation.playCount = 0;
                this.animationComponents["ani_main"].play();

                this.lastPlayedAnimation = null;
            }
        },
        playAnimation: function (animationName) {
            if (this.lastPlayedAnimation == animationName) return;
            if (this.lastPlayedAnimation) {
                this.animationComponents[this.lastPlayedAnimation].stop();
            }

            if(window.playerdead==1){
                //let mesh = this.bodyMeshObject.getComponent("mesh");
                //this.gunshotAnimation = this.gunshotAnimation.retarget(this.mesh.skin);
                console.log("player dead confirmed***********************************")

                this.animationComponents["ani_main"].animation = this.gunshotAnimation;
                this.animationComponents["ani_main"].animation.playCount = 1;
            }

            if(window.finished==1){
                //let mesh = this.bodyMeshObject.getComponent("mesh");
                //this.danceAnimation = this.danceAnimation.retarget(this.mesh.skin);
                this.animationComponents["ani_main"].animation = this.danceAnimation;
                this.animationComponents["ani_main"].animation.playCount = 1;
            }

            this.lastPlayedAnimation = animationName;
            
            this.animationComponents[animationName].play();
        },
        update: function(dt){
            if(window.finished==1){
                this.playAnimation("ani_main");
                window.finishtimer+=dt
            }

            if(window.finishtimer>39){

                if(WL.xrSession){
                    WL.xrSession.end();
                }
                location.reload(false);
            }

            //console.log("window.playerdead ",window.playerdead)
            //console.log(window.deathtimer)



            if(window.playerdead==1){
                this.object.getComponent('animation').active=true;
                //console.log("this.animation_complete",this.animation_complete)

                if(this.animation_complete==0){
                    //console.log("playing animation")
                    this.playAnimation("ani_main");
                    //this.animation_complete=1;
                    window.deathtimer+=dt
                }

                

                if(window.deathtimer>2.6 ){
                    this.animation_complete=1;
                    if(WL.xrSession){
                        WL.xrSession.end();
                    }
                    location.reload(false);
                    window.deathtimer=0;
                    this.object.getComponent('animation').stop();
                    //console.log("active set to false")
                    //window.playerdead=0;
                    //window.finished=0;
                    //window.cameramove=0;
                    //window.playermove=0;
                    //window.gamestart=0;
                    //window.starting_exception=true;
                    
                    

                    setTimeout(() => {
                        
                        //WL.scene.load("squid_game.bin");

                        //WL.onSceneLoaded.push(() => {
                        //    window.playerdead=0;
                        //    window.finished=0;
                        //    window.iswatching=false;
                        //    window.starting_exception=true;
                        //    window.cameramove=0;
                        //    window.playermove=0;
                        //    window.gamestart=0;
                        //    window.rotateflag=true;
                        //    window.deathtimer=0;
                           
                        //});
                        //location.reload(false);
                    }, 3000);

                }
                
            }
        }
    }
);