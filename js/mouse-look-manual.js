var previousTouch;

WL.registerComponent('mouse_look_manual', {
    /** Mouse look sensitivity */
    sensitity: {type: WL.Type.Float, default: 0.25},
    /** Require a mouse button to be pressed to control view.
     * Otherwise view will allways follow mouse movement */
    requireMouseDown: {type: WL.Type.Bool, default: true},
    /** If "moveOnClick" is enabled, mouse button which should
     * be held down to control view */
    mouseButtonIndex: {type: WL.Type.Int, default: 0},
}, {
    init: function() {
        this.currentRotationY = 0;
        this.currentRotationX = 0;
        this.origin = new Float32Array(3);
        this.parentOrigin = new Float32Array(3);
        document.addEventListener('touchmove', function(e) {

            //mobile surf
            const touch = e.touches[0];

            if (previousTouch) {
                // be aware that these only store the movement of the first touch in the touches array
                e.movementX = touch.pageX - previousTouch.pageX;
                e.movementY = touch.pageY - previousTouch.pageY;

                console.log(e.movementX,e.movementY);
            };

            previousTouch = touch;

            //mobile surf

            const vec3 = glMatrix.vec3;
            if(this.active && (this.mouseDown || !this.requireMouseDown)) {
                this.rotationY = -this.sensitity*e.movementX/100;
                this.rotationX = -this.sensitity*e.movementY/100;

                this.currentRotationX += this.rotationX;
                this.currentRotationY += this.rotationY;

                /* 1.507 = PI/2 = 90° */
                this.currentRotationX = Math.min(1.507, this.currentRotationX);
                this.currentRotationX = Math.max(-1.507, this.currentRotationX);

                this.object.getTranslationWorld(this.origin);
                this.object.parent.getTranslationWorld(this.parentOrigin);
                vec3.sub(this.origin, this.origin, this.parentOrigin);

                this.object.resetTranslationRotation();
                this.object.rotateAxisAngleRad([1, 0, 0], this.currentRotationX);
                this.object.rotateAxisAngleRad([0, 1, 0], this.currentRotationY);
                this.object.translate(this.origin);
            }
        }.bind(this));

        if(this.requireMouseDown) {
           
            WL.canvas.addEventListener('click', function() {
                    console.log("touch start")
           
                    this.mouseDown = true;
                    document.body.style.cursor = "grabbing";
            
            }.bind(this));
            WL.canvas.addEventListener('touchend', function() {
                    console.log("touch end")
                    this.mouseDown = false;
                    document.body.style.cursor = "initial";
            }.bind(this));
        }
    },
    start: function() {
        this.rotationX = 0;
        this.rotationY = 0;
    }
});