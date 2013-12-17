/**
 * @author Christopher D. Canfield
 * Door.js
 * December 2013
 */



/**
 * Creates an openable door.
 * @param {float} xLeft
 * @param {float} yBottom
 * @param {float} zBack
 * @param {float} width
 * @param {float} height
 * @param {float} depth
 * @param {Zone} zone The zone that the wall falls within.
 */
function Door(xLeft, yBottom, zBack, width, height, depth, zone) {
    Drawable.call(this);
    zone.addDrawable(this);
    
    var texture = cdc.textureManager.getTexture(Textures.DOOR_1);
    texture.needsUpdate = true;
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    texture.repeat.set(1, 1);
    
    this.geometry = new THREE.CubeGeometry(width, height, depth);
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(xLeft + (width / 2), yBottom + (height / 2) - 0.5, zBack - (depth / 2));
    this.threeJsDrawable = mesh;
    
    // Prevent camera from walking through wall.
    this.blockedArea = new BlockedArea(new BoundingBox(xLeft, width, yBottom, height, zBack - depth, depth));
    zone.addBlockedArea(this.blockedArea);
}


Door.prototype = Object.create(Drawable.prototype);
Door.prototype.constructor = Door;