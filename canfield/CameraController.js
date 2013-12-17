/**
 * @author Christopher D. Canfield
 * CameraController.js
 * November 2013
 */



/**
 * Processes user input that is related to the Camera.
 * @param {int} canvasWidth The width of the canvas.
 * @param {int} canvasHeight The height of the canvas.
 * @param {Camera} camera Reference to the Camera object.
 * @param {Door[]} doors
 */
function CameraController(canvasWidth, canvasHeight, camera, doors) {    
    this.camera = camera;
    this.doors = doors;
    
    this.lastMouseX = canvasWidth / 2.0;
    this.lastMosueY = canvasHeight / 2.0;
    
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    
    // Set the keydown event handler, and bind this object's "this" pointer to it. 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    window.addEventListener("keydown", this.keyDown.bind(this), false);
    window.onmousemove = this.mouseMove.bind(this);
    
    // Specifies whether additional debug information is printed to the console.
    this.debug = false;
};


/**
 * Processes key down events.
 * @param {Object} e A keydown event object.
 */
CameraController.prototype.keyDown = function(e) {
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
    
    if (keyCode === KeyEvent.DOM_VK_LEFT ||
            keyCode === KeyEvent.DOM_VK_A)
    {
        if (this.debug) console.log("Key: Left");
        return this.camera.strafeLeft();
    }
    else if (keyCode === KeyEvent.DOM_VK_RIGHT ||
            keyCode === KeyEvent.DOM_VK_D)
    {
        if (this.debug) console.log("Key: Right");
        return this.camera.strafeRight();
    }
    else if (keyCode === KeyEvent.DOM_VK_UP ||
            keyCode === KeyEvent.DOM_VK_W)
    {
        if (this.debug) console.log("Key: Up");
        return this.camera.moveForward();
 
    }
    else if (keyCode === KeyEvent.DOM_VK_DOWN ||
            keyCode === KeyEvent.DOM_VK_S)
    {
        if (this.debug) console.log("Key: Down");
        return this.camera.moveBackward();
    }
    else if (keyCode === KeyEvent.DOM_VK_Q)
    {
        this.camera.rotate180();
        return true;
    }
    else if (keyCode === KeyEvent.DOM_VK_E)
    {
        var box = this.camera.getBoundingBox().clone();
        box.xLeft -= 55;
        box.width += 110;
        box.zBack -= 65;
        box.depth += 130;
        
        for (var i = 0; i < this.doors.length; ++i)
        {
            if (this.doors[i].intersects(box) && !this.doors[i].isOpen())
            {
                this.doors[i].open();
            }
        }
    }
};

/**
 * Processes mouse move events.
 * @param {Object} e A mousemove event object.
 */
CameraController.prototype.mouseMove = function(e) {
    if (e.clientX > (this.canvasWidth / 2 + 5) && e.clientX > this.lastMouseX)
    {
        if (this.debug) console.log("mouse move x right: " + e.clientX);
        this.camera.rotateRight(e.clientX - this.lastMouseX);
    }
    else if (e.clientX < (this.canvasWidth / 2 - 5) && e.clientX < this.lastMouseX)
    {
        if (this.debug) console.log("mouse move x left: " + e.clientX);
        this.camera.rotateLeft(this.lastMouseX - e.clientX);
    }
    this.lastMouseX = e.clientX;
    
    if (e.clientY > this.lastMouseY)
    {
        if (this.debug) console.log("mouse move y up: " + e.clientY);
    }
    else if (e.clientY < this.lastMouseY)
    {
        if (this.debug) console.log("mouse move y down: " + e.clientY);
    }
    this.lastMouseY = e.clientY;
};