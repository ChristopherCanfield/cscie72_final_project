/**
 * @author Christopher D. Canfield
 * Projectile.js
 * December 2013
 */

// TODO: Implement this.

/**
 * Creates a projectile.
 * @param {Vector3} movementVector
 * @param {Vector3} location
 * @param {Zone} zone The zone that the wall falls within.
 */
function Projectile(movementVector, location, zone) {
    Drawable.call(this);
    
    this.movementVector = movementVector;
    this.location = location;
    
    // TODO: change the texture.
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
}

Projectile.prototype = Object.create(Drawable.prototype);
Projectile.prototype.constructor = Projectile;

Projectile.prototype.onHit = function() {
    
};

Projectile.prototype.update = function(deltaTime) {
    
};
