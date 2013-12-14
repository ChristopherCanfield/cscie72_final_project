/**
 * @author Christopher D. Canfield
 * Projectile.js
 * December 2013
 */

// TODO: Implement this.

/**
 * Creates a projectile.
 * @param {Zone} zone The zone that the projectile falls within.
 * @param {ParticleSystemPool} particleSystemPool 
 * @param {THREE.Vector3} movementVector
 * @param {THREE.Vector3} location
 * @param {float} size
 * @param {int} lifetime The max number of milliseconds that the project will live.
 */
function Projectile(zone, particleSystemPool, movementVector, location, size, lifetime) {
    Drawable.call(this);
    zone.addDrawable(this);
    this.zone = zone;
    
    this.movementVector = movementVector;
    this.location = location;
    this.particleSystemPool;
    
    this.lifetime = lifetime;
    this.lifeMillis = 0;
    
    this.done = false;
    
    // TODO: change the texture.
    var texture = cdc.textureManager.getTexture(texturePath).clone();
    texture.needsUpdate = true;
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    texture.repeat.set(textureRepeatX, textureRepeatY);
    
    this.geometry = new THREE.CubeGeometry(width, height, depth);
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(location.x + (size / 2), location.y + (size / 2), location.z - (size / 2));
    this.threeJsDrawable = mesh;
    
    this.boundingBox = new BoundingBox(location.x, size, location.y, size, location.z, size);
}

Projectile.prototype = Object.create(Drawable.prototype);
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function(deltaTime) {
    if (this.done) return;
    
    if ((this.lifeMillis + deltaTime) > this.lifetime)
    {
        this.setDone(true);
        return;
    }
    ++this.lifeMillis;
    
    this.threeJsDrawable.position.x += (this.movementVector.x * deltaTime);
    this.threeJsDrawable.position.y += (this.movementVector.y * deltaTime);
    this.threeJsDrawable.position.z += (this.movementVector.z * deltaTime);
    
    this.boundingBox.xLeft += (this.movementVector.x * deltaTime);
    this.boundingBox.yBottom += (this.movementVector.y * deltaTime);
    this.boundingBox.zBack += (this.movementVector.z * deltaTime);
    
    var blockedAreas = this.zone.getBlockedAreas();
    for (var i = 0; i < blockedAreas.length; ++i)
    {
        if (blockedAreas[i].intersects(this.boundingBox))
        {
            this.onHit();
        }
    }
};

Projectile.prototype.onHit = function() {
    this.setDone(true);
    
    var position = new THREE.Vector3(StartRoom.X_LEFT + 375, 30, StartRoom.Z_BACK + 400);
    var speed = new THREE.Vector3(13.5, 9.5, 13.5);
    var particleSize = 0.4;

    var particleSystem = particleSystemPool.getExplosionSystem(this.zone, 1750, 200,
            position, speed, new THREE.Color("rgb(180, 0, 0)"), 1750, ParticleSpread.MEDIUM);
    
};

ParticleSystem.prototype.isDone = function() {
    return this.done;
};

ParticleSystem.prototype.setDone = function(done) {
    this.done = done;
};
