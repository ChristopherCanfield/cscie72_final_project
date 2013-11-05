/**
 * @author Christopher D. Canfield
 * CSCI E-72 HW5
 * 2013-10-22
 */


/**
 * The OpenGL context.
 */
var gl;

// Constants
var glCOLOR_BUFFER_BIT = true;
var glDEPTH_BUFFER_BIT = true;

var cdc = {
    /**
     * Processes camera movements.
     */
    moveableCamera: null, 
    
    /**
     * The root of the scene graph.
     */
    scene: null,
    
    textureManager: null,
    
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
        antialias: true 
    };
    
    // Create the webGL render.
    gl = new THREE.WebGLRenderer(glParameters);
    gl.setClearColor(Colors.SKY_GETTING_DARK_4); // gl.clearColor(r, g, b);
    gl.setDepthTest(true); // gl.enable(gl.DEPTH_TEST);
    
    cdc.textureManager = new TextureManager(gl);
    
    // Wrap the camera so it can be moved.
    cdc.moveableCamera = new MoveableCamera(window, glCanvas.width, glCanvas.height);
    
    // Create the scene graph root node, and populate the scene.
    cdc.scene = new LostWorldScene(gl);
    cdc.scene.createScene();
    cdc.scene.getThreeJsScene().add(cdc.moveableCamera.yawObject);
    
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
    gl.render(cdc.scene.getThreeJsScene(), cdc.moveableCamera.getCamera());
    
    cdc.scene.update(cdc.timer.getDelta());
    
    window.requestAnimationFrame(render);
}

