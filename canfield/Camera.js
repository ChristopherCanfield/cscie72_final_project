/**
 * @author Christopher D. Canfield
 * Camera.js
 * October 2013; Updated November 2013
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



/**
 * 
 * @param {Object} window
 * @param {Zones} zones
 * @param {int} glCanvasWidth
 * @param {int} glCanvasHeight
 */
function Camera(window, zones, glCanvasWidth, glCanvasHeight) {
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
    
    this.rotationSpeed = 0.01;
    this.movementSpeed = 10.15;
    this.movementSpeedY = 10.025;
    
    this.velocity = new THREE.Vector3();
    
    this.target = null;
    this.zones = zones;
    
    this.width = 20;
    this.height = 20;
    this.depth = 20;
}


Camera.prototype.getThreeJSCamera = function() {
    return this.camera;
};

Camera.prototype.getMovementSpeed = function() {
    return this.movementSpeed;
};

Camera.prototype.getMovementSpeedY = function() {
    return this.movementSpeedY;
};

Camera.prototype.getRotationSpeed = function() {
    return this.rotationSpeed;
};


Camera.prototype.update = function() {
    var MIN_Y = 0;
    
    this.yawObject.translateX(this.velocity.x);
    
    if (this.yawObject.position.y + this.velocity.y > MIN_Y)
    {
        this.yawObject.translateY(this.velocity.y);
    } 
    this.yawObject.translateZ(this.velocity.z);
};

Camera.prototype.rotateLeft = function(amount) {
    this.yawObject.rotation.y += this.rotationSpeed * amount;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.velocity.z = 0;
    this.update();
};

Camera.prototype.rotateRight = function(amount) {
    this.yawObject.rotation.y -= this.rotationSpeed * amount;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.velocity.z = 0;
    this.update();
};

/**
 * Moves the camera forward, if doing so won't cause it to conflict with a 
 * blocked area.
 * @return true if the camera moved, or false if not.
 */
Camera.prototype.moveForward = function() {
    if (this.isValidMove(-this.movementSpeed))
    {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.velocity.z = -this.movementSpeed;
        this.update();
        return true;
    }
    else
    {
        return false;
    }
};

/**
 * Moves the camera backward, if doing so won't cause it to conflict with a 
 * blocked area.
 * @return true if the camera moved, or false if not.
 */
Camera.prototype.moveBackward = function() {
    if (this.isValidMove(this.movementSpeed))
    {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.velocity.z = this.movementSpeed;
        this.update();
        return true;
    }
    else
    {
        return false;
    }
};

Camera.prototype.upY = function() {
    this.velocity.x = 0;
    this.velocity.y = this.movementSpeedY;
    this.velocity.z = 0;
    this.update(); 
};

Camera.prototype.downY = function() {
    this.velocity.x = 0;
    this.velocity.y = -this.movementSpeedY;
    this.velocity.z = 0;
    this.update(); 
};

Camera.prototype.strafeLeft = function() {
    this.velocity.x = -this.movementSpeed;
    this.velocity.y = 0;
    this.velocity.z = 0;
    this.update(); 
};

Camera.prototype.strafeRight = function() {
    this.velocity.x = this.movementSpeed;
    this.velocity.y = 0;
    this.velocity.z = 0;
    this.update(); 
};

Camera.prototype.getCameraTarget = function() {
    return this.cameraTarget;   
};

Camera.prototype.isValidMove = function(movement) {
    var clonedYawObject = new THREE.Object3D();
    clonedYawObject.position.x = this.yawObject.position.x;
    clonedYawObject.position.y = this.yawObject.position.y;
    clonedYawObject.position.z = this.yawObject.position.z;
    clonedYawObject.rotation.x = this.yawObject.rotation.x;
    clonedYawObject.rotation.y = this.yawObject.rotation.y;
    clonedYawObject.rotation.z = this.yawObject.rotation.z;
    
    clonedYawObject.translateZ(movement);
    var newBoundingBox = new BoundingBox(clonedYawObject.position.x, this.width,
            clonedYawObject.position.y, this.height,
            clonedYawObject.position.z, this.depth);
    var touchedZones = this.zones.getCurrentZones(newBoundingBox);
    
    for (var i = 0; i < touchedZones.length; ++i)
    {
        var blockedAreas = touchedZones[i].getBlockedAreas();
        if (blockedAreas.length > 0)
        {
            return true;
        }
    }
    return false;
};
