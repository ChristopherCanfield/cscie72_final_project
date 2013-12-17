/**
 * @author Christopher D. Canfield
 * FloorLamp.js
 * November 2013
 */



/**
 * Creates a floor lamp, which generates light and a bit of smoke.
 * @param {float} xLeft
 * @param {float} yBottom
 * @param {float} zBack
 * @param {float} width
 * @param {float} height
 * @param {float} depth
 * @param {Zone} zone The zone that the lamp falls within.
 */
function FloorLamp(xLeft, yBottom, zBack, width, height, depth, zone) {
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
    zone.addBlockedArea(this.blockedArea);
}

FloorLamp.prototype = Object.create(Drawable.prototype);
FloorLamp.prototype.constructor = FloorLamp;