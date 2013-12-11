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
    cameraController: null,
    
    /**
     * Timer used for logic, movement & animation.
     */
    timer: null
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
    
    // Create the webGL render.
    gl = new THREE.WebGLRenderer(glParameters);
    gl.setClearColor(Colors.SKY_GETTING_DARK_4); // gl.clearColor(r, g, b);
    gl.setDepthTest(true); // gl.enable(gl.DEPTH_TEST);
    
    cdc.textureManager = new TextureManager(gl);
    
    // Create the scene graph root node, and populate the scene.
    cdc.scene = new GameScene();
    cdc.scene.createScene();
    
    // Create the camera so it can be moved.
    cdc.camera = new Camera(cdc.scene.getZones(), window, glCanvas.width, glCanvas.height);
    cdc.camera.debug = true;
    cdc.cameraController = new CameraController(glCanvas.width, glCanvas.height, cdc.camera);
    
    cdc.scene.getThreeJsScene().add(cdc.camera.yawObject);
    
    cdc.timer = new THREE.Clock();
    cdc.timer.start();
    
    render();
};


/**
 * Draw the scene.
 */
function render()
{
    // TODO: get the current zone, plus all adjacent zones, and render them.
    
    gl.clear(glCOLOR_BUFFER_BIT, glDEPTH_BUFFER_BIT); //gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.render(cdc.scene.getThreeJsScene(), cdc.camera.getThreeJSCamera());
    
    // Process logic, movement and animation updates.
    var deltaTime = cdc.timer.getDelta();
    cdc.scene.update(deltaTime);
    cdc.scene.getZones().updateParticles(deltaTime, cdc.camera.getBoundingBox());
    cdc.camera.update(deltaTime);
    
    window.requestAnimationFrame(render);
}

