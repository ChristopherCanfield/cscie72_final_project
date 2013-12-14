/**
 * @author Christopher D. Canfield
 * Gate.js
 * December 2013
 */

// TODO: implement this.

/**
 * Creates an impassable wall.
 * @param {float} xLeft
 * @param {float} zBack
 * @param {float} width
 * @param {float} height
 * @param {float} depth
 * @param {String} texturePath
 * @param {int} textureRepeatX
 * @param {int} textureRepeatY
 * @param {Zone} zone The zone that the wall falls within.
 */
function Gate(xLeft, yBottom, zBack, 
        width, height, depth, 
        texturePath, textureRepeatX, textureRepeatY, 
        zone, debug) {
    Drawable.call(this);
    zone.addDrawable(this);
    
    var texture = cdc.textureManager.getTexture(texturePath).clone();
    texture.needsUpdate = true;
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    texture.repeat.set(textureRepeatX, textureRepeatY);
    
    this.geometry = new THREE.CubeGeometry(width, height, depth);
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(xLeft + (width / 2), yBottom + (height / 2) - 0.5, zBack - (depth / 2));
    this.threeJsDrawable = mesh;
    
    // Prevent camera from walking through wall.
    this.blockedArea = new BlockedArea(new BoundingBox(xLeft, width, yBottom, height, zBack - depth, depth));
    
    if (typeof debug !== "undefined" && debug)
    {
        console.log("Gate: (" + mesh.position.x + "," + mesh.position.y + "," + mesh.position.z + ") | (" + xLeft + ",0," + zBack + ")");
        console.log("Gate Width,Height,Depth: " + width + "," + height + "," + depth);
    }
    
    this.isOpening = false;
    this.finishedOpening = false;
}


Gate.prototype = Object.create(Drawable.prototype);
Gate.prototype.constructor = Gate;

Gate.prototype.open = function() {
    // TODO: implement this.
};

Gate.prototype.update = function(deltaTime) {
    // TODO: implement this.
};
