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



function Camera(window, glCanvasWidth, glCanvasHeight) {
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
};


Camera.prototype.getThreeJSCamera = function() {
    return this.camera;
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

Camera.prototype.moveForward = function() {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.velocity.z = -this.movementSpeed;
    this.update();
};

Camera.prototype.moveBackward = function() {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.velocity.z = this.movementSpeed;
    this.update();
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

