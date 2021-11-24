//import {Howl} from 'howler';
//const Howl=howler.Howl
/**
 * (Spatial) audio source based on [Howler.js](https://howlerjs.com/).
 *
 * Creates a Howler audio source, plays an audio file on it and updates
 * its position.
 *
 * Optimizes the position update to only update if the difference to last
 * position is larger than half a centimeter. To force updates (e.g. if
 * the sound source is _very_ close to the listener),
 * use `.updatePosition()`.
 */
WL.registerComponent("howler-custom-source", {
  /** Volume */
  volume: {type: WL.Type.Float, default: 1.0},
  /** Whether audio should be spatialized/positional */
  spatial: {type: WL.Type.Bool, default: true},
  /** Whether to loop the sound */
  loop: {type: WL.Type.Bool, default: false},
  /** Whether to start playing automatically */
  autoplay: {type: WL.Type.Bool, default: false},
  /** URL to a sound file to play */
  src: {type: WL.Type.String, default: ""}

}, {
  init:function() {
    window.general_timer=45;
    window.gamestart=0;
    this.clock_playflag==0;
    this.tick_flag=0;

    this.audio = new Howl({
      src: [this.src],
      loop: this.loop,
      volume: this.volume,
      autoplay: this.autoplay
    });

    this.audio = new Howl({

          src: ["static/theme.mp3"],
          loop: this.loop,
          volume: this.volume,
          autoplay: this.autoplay
        });
    this.audio = new Howl({
          src: ["static/hehe.mp3"],
          loop: this.loop,
          volume: this.volume,
          autoplay: this.autoplay
    });

    this.audio = new Howl({
          src: ["static/green_light.mp3"],
          loop: this.loop,
          volume: this.volume,
          autoplay: this.autoplay
    });
    
    this.audio = new Howl({
          src: ["static/red_light.mp3"],
          loop: this.loop,
          volume: this.volume,
          autoplay: this.autoplay
    });

    this.audio2 = new Howl({

          src: ["static/shot.mp3"],
          loop: this.loop,
          volume: .5,
          autoplay: this.autoplay
        });
    this.audio_time = new Howl({
        src: ["static/click.mp3"],
        loop: false,
        volume: 0.1,
        autoplay: false
      });
  },

  start: function() {
    

    this.lastPlayedAudioId = null;
    this.origin = new Float32Array(3);
    this.lastOrigin = new Float32Array(3);
    this.finished=1;
    this.dead=1;
    this.watching=1;
    this.notwatching=1;
    this.playerdead=1;
    this.shot=0;
    this.tick=0;
    this.intro=1;

    if(this.spatial && this.autoplay) {
      this.updatePosition();
      this.play();
    }

    /* Stop sound after switching scenes */
    const callback = () => {
        this.stop();
        const idx = WL.onSceneLoaded.indexOf(callback);
        if(idx >= 0) WL.onSceneLoaded.splice(idx, 1);
    };
    WL.onSceneLoaded.push(callback);
    //WL.onXRSessionStart.push(this._onXRSessionStart.bind(this));
    this._onXRSessionStart()
  },

  update: function(dt) {
    
    
    if(window.gamestart==1){
      this.audio3.stop();
      
      
    }
    if(window.finished==1){
      this.stop();
    }

    if(window.general_timer>0){
      if(window.gamestart==1){
        if(window.finished!=1){
          window.general_timer-=dt;
        }
        
      }
    }

    if (Math.round(window.general_timer)>window.general_timer){
        this.object.getComponent("text").text=Math.round(window.general_timer).toString();
    }

    if(window.general_timer<.1){ 
      if(window.finished!=1){
        window.playerdead=1;
      }
        
    }
    


    if(this.intro=0){
      if(window.gamestart==1){
        this.stop()
      }
    }
  

    if(window){
         
    
    
    if(window.finished==1){
      if(this.finished==1){
        
        this.audio = new Howl({
          src: ["static/theme.mp3"],
          loop: this.loop,
          volume: this.volume,
          autoplay: this.autoplay
        });

        console.log("finished ")
        this.updatePosition();
        this.play();
        this.finished=0;
      }   
    }
    if(window.playerdead==1){
      if(this.playerdead==1){
        //console.log("player dead")

        this.shot=1;

        this.updatePosition();
        this.play();
        this.playerdead=0;
      }   
    }

    this.shot=0;

   

    if(window.gamestart==1 && window.finished!=1 && this.tick_flag==0){

      //start clock

      if(this.lastPlayedAudioId) this.audio_time.stop(this.lastPlayedAudioId);
      this.lastPlayedAudioId = this.audio_time.play();
      if(this.spatial) this.updatePosition();
      
      this.tick_flag=1;
    }
    
    if(window.finished==1){
      //stop clock
      //this.stop();
      this.audio_time.volume=0;
    }
    

    

    if(window.iswatching==true){
      if(this.watching==1){

        this.audio = new Howl({
          src: ["static/red_light.mp3"],
          loop: this.loop,
          volume: this.volume,
          autoplay: this.autoplay
        });

        console.log("watching")
        this.updatePosition();
        this.play();
        this.watching=0;
        this.notwatching=1;
      }   
    }

    if(window.iswatching==false){
      if(this.notwatching==1){

        this.audio = new Howl({
          src: ["static/green_light.mp3"],
          loop: this.loop,
          volume: this.volume,
          autoplay: this.autoplay
        });

        console.log("not watching")
        this.updatePosition();
        this.play();
        this.notwatching=0;
        this.watching=1;
      }   
    }

    }
    
    if(!this.spatial || !this.lastPlayedAudioId) return;

    this.object.getTranslationWorld(this.origin);
    /* Only call pos() if the position moved more than half a centimeter
     * otherwise this gets very performance heavy.
     * Smaller movement should only be perceivable if close to the
     * ear anyway. */
    if(Math.abs(this.lastOrigin[0] - this.origin[0]) > 0.005 ||
       Math.abs(this.lastOrigin[1] - this.origin[1]) > 0.005 ||
       Math.abs(this.lastOrigin[2] - this.origin[2]) > 0.005)
    {
      this.updatePosition();
    }
  },

  updatePosition: function() {
      this.audio.pos(this.origin[0], this.origin[1], this.origin[2],
        this.lastPlayedAudioId);
      this.lastOrigin.set(this.origin);
  },



  play: function() {
    if(this.lastPlayedAudioId) this.audio.stop(this.lastPlayedAudioId);

    this.lastPlayedAudioId = this.audio.play();
    
    if(this.spatial) this.updatePosition();

    if(this.shot==1){
      if(this.lastPlayedAudioId) this.audio2.stop(this.lastPlayedAudioId);

      this.lastPlayedAudioId = this.audio2.play();
      
      if(this.spatial) this.updatePosition();
    }
    if(window.gamestart!=1){
      if(this.lastPlayedAudioId) this.audio3.stop(this.lastPlayedAudioId);

      //this.lastPlayedAudioId = this.audio3.play();
      
      if(this.spatial) this.updatePosition();
    }
    if(this.tick==1 ){
      if(this.lastPlayedAudioId) this.audio_time.stop(this.lastPlayedAudioId);

      this.lastPlayedAudioId = this.audio_time.play();
      
      
      if(this.spatial) this.updatePosition();
      
      
    }

  },

  stop: function() {
    if(finished!=1){
      if(!this.lastPlayedAudioId) return;
      this.audio.stop(this.lastPlayedAudioId);
      this.lastPlayedAudioId = null;
    }
    

    if(this.shot==1){
      if(!this.lastPlayedAudioId) return;
      this.audio2.stop(this.lastPlayedAudioId);
      this.lastPlayedAudioId = null;
    }

    if(window.gamestart==1){
      if(!this.lastPlayedAudioId) return;
      this.audio3.stop(this.lastPlayedAudioId);
      this.lastPlayedAudioId = null;
    }

    if(window.finished==1){
      if(!this.lastPlayedAudioId) return;
      this.audio_time.stop(this.lastPlayedAudioId);
      this.lastPlayedAudioId = null;
    }
  },
  

  _onXRSessionStart: function () {
    if(this.intro==1){
        
      this.audio3 = new Howl({
        src: ["static/hehe.mp3"],
        loop: true,
        volume: 0.4,
        autoplay: true
      });

      console.log("start ")
      this.updatePosition();
      this.play();
      this.intro=0;
    }

    
  
  },


});