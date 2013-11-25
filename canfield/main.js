/**
 * @author Christopher D. Canfield
 * CSCI E-72 HW5
 * 2013-10-22
 * Updated November 2013
 */


/**
 * The OpenGL context.
 */
var gl;

// OpenGL Constants
var glCOLOR_BUFFER_BIT = true;
var glDEPTH_BUFFER_BIT = true;

var cdc = {
    /**
     * Processes camera movements.
     */
    camera: null, 
    
    /**
     * The root of the scene graph.
     */
    scene: null,
    
    /**
     * Assists with loading textures.
     */
    textureManager: null,
    
    /**
     * Processes user input.
     */
    inputManager: null,
    
    /**
     * Timer used for logic, movement & animation.
     */
    timer: null,
    
    /**
     * Specifies whether to log events to console.
     */
    debug: false
};

init();
render();

function init()
{
     'use strict';
    var glCanvas = document.getElementById("gl-canvas");
    
    var glParameters = {
        canvas: glCanvas,
        alpha: false,
        antialias: true     // TODO: allow user to turn this on or off.
    };
    
    cdc.debug = true;
    
    // Create the webGL render.
    gl = new THREE.WebGLRenderer(glParameters);
    gl.setClearColor(Colors.SKY_GETTING_DARK_4); // gl.clearColor(r, g, b);
    gl.setDepthTest(true); // gl.enable(gl.DEPTH_TEST);
    
    cdc.textureManager = new TextureManager(gl);
    
    // Wrap the camera so it can be moved.
    cdc.camera = new Camera(window, glCanvas.width, glCanvas.height);
    cdc.inputManager = new InputManager(glCanvas.width, glCanvas.height, cdc.camera);
    
    // Create the scene graph root node, and populate the scene.
   // cdc.scene = new VillageScene(gl);
   // cdc.scene.createScene();
   // cdc.scene.getThreeJsScene().add(cdc.camera.yawObject);
    
    cdc.timer = new THREE.Clock();
    cdc.timer.start();
    
    render();
};


/**
 * Draw the scene.
 */
function render()
{
    gl.clear(glCOLOR_BUFFER_BIT, glDEPTH_BUFFER_BIT); //gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.render(cdc.scene.getThreeJsScene(), cdc.camera.getThreeJSCamera());
    
    // Process logic, movement and animation updates.
    cdc.scene.update(cdc.timer.getDelta());
    
    window.requestAnimationFrame(render);
}
