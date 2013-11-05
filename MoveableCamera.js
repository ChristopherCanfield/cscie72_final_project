/**
 * @author Christopher D. Canfield
 * MoveableCamera.js
 * Keyboard Event API Source: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
 * Parts adapted from: three.js "geometry / minecraft" example
 *      http://threejs.org/examples/js/controls/FirstPersonControls.js
 * Parts adapted from: three.js "controls / fly" example
 *      http://threejs.org/examples/js/controls/FlyControls.js
 * Parts adapted from: three.js "controls / pointer lock" example
 *      http://threejs.org/examples/js/controls/PointerLockControls.js
 * Parts adapted from: "Creating a First Person Camera"
 *      www-rohan.sdsu.edu/~stewart/cs583/LearningXNA3_lects/Lect15_Ch11_CreateFirstPersonCamera.html
 */



function MoveableCamera(window, glCanvasWidth, glCanvasHeight) {
    // Create the camera.
    this.camera = new THREE.PerspectiveCamera(45, glCanvasWidth / glCanvasHeight, 0.1, 10000.0); // 0.1, 10
    this.cameraTarget = new THREE.Vector3(0.0, 0.0, 0.0);
    
    this.camera.rotation.set(0, 0, 0);
    
    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add(this.camera);

    this.yawObject = new THREE.Object3D();
    this.yawObject.position.z = 0;
    this.yawObject.rotation.x = 0;
    this.yawObject.position.y = 20;
    this.yawObject.rotation.y = 0;
    this.yawObject.add(this.pitchObject);
    
    this.rotationSpeed = 0.1;
    this.movementSpeed = 10.15;
    this.movementSpeedY = 10.025;
    
    this.velocity = new THREE.Vector3();
    
    this.target = null;

    // Set the keydown event handler, and bind this object's "this" pointer to it. 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    window.onkeydown = this.keyDown.bind(this);
};


MoveableCamera.prototype.getCamera = function() {
    return this.camera;
};


MoveableCamera.prototype.update = function() {
    var MIN_Y = 0;
    
    this.yawObject.translateX(this.velocity.x);
    
    if (this.yawObject.position.y + this.velocity.y > MIN_Y)
    {
        this.yawObject.translateY(this.velocity.y);
    } 
    this.yawObject.translateZ(this.velocity.z);
};

MoveableCamera.prototype.rotateLeft = function() {
    this.yawObject.rotation.y += this.rotationSpeed;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.velocity.z = 0;
    this.update();
};

MoveableCamera.prototype.rotateRight = function() {
    this.yawObject.rotation.y -= this.rotationSpeed;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.velocity.z = 0;
    this.update();
};

MoveableCamera.prototype.moveForward = function() {
    // this.camera.translateZ(-this.movementSpeed);
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.velocity.z = -this.movementSpeed;
    this.update();
};

MoveableCamera.prototype.moveBackward = function() {
    // this.camera.translateZ(this.movementSpeed);
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.velocity.z = this.movementSpeed;
    this.update();
};

MoveableCamera.prototype.upY = function() {
    this.velocity.x = 0;
    this.velocity.y = this.movementSpeedY;
    this.velocity.z = 0;
    this.update(); 
};

MoveableCamera.prototype.downY = function() {
    this.velocity.x = 0;
    this.velocity.y = -this.movementSpeedY;
    this.velocity.z = 0;
    this.update(); 
};

MoveableCamera.prototype.strafeLeft = function() {
    this.velocity.x = -this.movementSpeed;
    this.velocity.y = 0;
    this.velocity.z = 0;
    this.update(); 
};

MoveableCamera.prototype.strafeRight = function() {
    this.velocity.x = this.movementSpeed;
    this.velocity.y = 0;
    this.velocity.z = 0;
    this.update(); 
};

MoveableCamera.prototype.keyDown = function(e) {
    if (typeof KeyEvent == "undefined") {
        var KeyEvent = {
            DOM_VK_LEFT: 37,
            DOM_VK_RIGHT: 39,
            DOM_VK_UP: 38,
            DOM_VK_DOWN: 40,
            DOM_VK_W: 87,
            DOM_VK_A: 65,
            DOM_VK_S: 83,
            DOM_VK_D: 68,
            DOM_VK_Q: 81,
            DOM_VK_E: 69
        };
    }
        
    var keyCode = e.keyCode || e.which;
    
    if (keyCode == KeyEvent.DOM_VK_LEFT ||
            keyCode == KeyEvent.DOM_VK_A)
    {
        if (e.ctrlKey === true)
        {
            this.strafeLeft();
        }
        else
        {
            console.log("Key: Left");
            this.rotateLeft();
        }
        return false;
    }
    else if (keyCode == KeyEvent.DOM_VK_RIGHT ||
            keyCode == KeyEvent.DOM_VK_D)
    {
        if (e.ctrlKey === true)
        {
            this.strafeRight();
        }
        else
        {
            console.log("Key: Right");
            this.rotateRight();
        }
        return false;
    }
    else if (keyCode == KeyEvent.DOM_VK_UP ||
            keyCode == KeyEvent.DOM_VK_W)
    {
        console.log("Key: Up");
        this.moveForward();
        return false;
 
    }
    else if (keyCode == KeyEvent.DOM_VK_DOWN ||
            keyCode == KeyEvent.DOM_VK_S)
    {
        console.log("Key: Down");
        this.moveBackward();
        return false;
    }
    else if (keyCode == KeyEvent.DOM_VK_Q)
    {
        this.upY();
        return false;
    }
    else if (keyCode == KeyEvent.DOM_VK_E)
    {
        this.downY();
        return false;
    }
};

MoveableCamera.prototype.getCameraTarget = function() {
    return this.cameraTarget;   
};

