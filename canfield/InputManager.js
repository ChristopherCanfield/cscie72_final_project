/**
 * @author Christopher D. Canfield
 * InputManager.js
 * November 2013
 */



/**
 * Processes user input.
 * @param {int} canvasWidth The width of the canvas.
 * @param {int} canvasHeight The height of the canvas.
 * @param {Camera} camera Reference to the Camera object.
 */
function InputManager(canvasWidth, canvasHeight, camera) {
    this.camera = camera;
    
    this.lastMouseX = canvasWidth / 2.0;
    this.lastMosueY = canvasHeight / 2.0;
    
    // Set the keydown event handler, and bind this object's "this" pointer to it. 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    window.onkeydown = this.keyDown.bind(this);
    window.onmousemove = this.mouseMove.bind(this);
};


/**
 * Processes key down events.
 * @param {Object} e A keydown event object.
 */
InputManager.prototype.keyDown = function(e) {
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
            this.camera.strafeLeft();
        }
        else
        {
            if (cdc.debug) console.log("Key: Left");
            this.camera.rotateLeft();
        }
        return false;
    }
    else if (keyCode == KeyEvent.DOM_VK_RIGHT ||
            keyCode == KeyEvent.DOM_VK_D)
    {
        if (e.ctrlKey === true)
        {
            this.camera.strafeRight();
        }
        else
        {
            if (cdc.debug) console.log("Key: Right");
            this.camera.rotateRight();
        }
        return false;
    }
    else if (keyCode == KeyEvent.DOM_VK_UP ||
            keyCode == KeyEvent.DOM_VK_W)
    {
        if (cdc.debug) console.log("Key: Up");
        this.camera.moveForward();
        return false;
 
    }
    else if (keyCode == KeyEvent.DOM_VK_DOWN ||
            keyCode == KeyEvent.DOM_VK_S)
    {
        if (cdc.debug) console.log("Key: Down");
        this.camera.moveBackward();
        return false;
    }
    
    // TODO (2013-11-09): The next lines allow vertical movement. Remove this 
    // if they remain unused.
    
    // else if (keyCode == KeyEvent.DOM_VK_Q)
    // {
        // this.upY();
        // return false;
    // }
    // else if (keyCode == KeyEvent.DOM_VK_E)
    // {
        // this.downY();
        // return false;
    // }
};

/**
 * Processes mouse move events.
 * @param {Object} e A mousemove event object.
 */
InputManager.prototype.mouseMove = function(e) {
    if (e.clientX > this.lastMouseX)
    {
        if (cdc.debug) console.log("mouse move x right: " + e.clientX);
        this.camera.rotateRight(e.clientX - this.lastMouseX);
    }
    else if (e.clientX < this.lastMouseX)
    {
        if (cdc.debug) console.log("mouse move x left: " + e.clientX);
        this.camera.rotateLeft(this.lastMouseX - e.clientX);
    }
    this.lastMouseX = e.clientX;
    
    if (e.clientY > this.lastMouseY)
    {
        if (cdc.debug) console.log("mouse move y up: " + e.clientY);
    }
    else if (e.clientY < this.lastMouseY)
    {
        if (cdc.debug) console.log("mouse move y down: " + e.clientY);
    }
    this.lastMouseY = e.clientY;
    
};