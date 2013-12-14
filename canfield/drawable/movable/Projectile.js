/**
 * @author Christopher D. Canfield
 * Projectile.js
 * December 2013
 */


/**
 * Creates a projectile.
 * @param {Zone} zone The zone that the projectile falls within.
 * @param {ParticleSystemPool} particleSystemPool 
 * @param {THREE.Vector3} movementVector
 * @param {THREE.Vector3} location
 * @param {float} size
 * @param {int} lifetime The max number of milliseconds that the project will live.
 * @param {string} texturePath
 * @param {int} textureRepeatX
 * @param {int} textureRepeatY
 */
function Projectile(zone, particleSystemPool, threeJsScene, movementVector, rotation, location, size, lifetime, 
        texturePath, textureRepeatX, textureRepeatY) {
    Drawable.call(this);
    zone.addDrawable(this);
    this.zone = zone;
    this.threeJsScene = threeJsScene;
    
    this.movementVector = movementVector;
    this.particleSystemPool;
    
    this.lifetime = lifetime;
    this.lifeMillis = 0;
    
    this.done = false;
    
    var texture = cdc.textureManager.getTexture(texturePath);
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    texture.repeat.set(textureRepeatX, textureRepeatY);
    
    this.geometry = new THREE.SphereGeometry(size, 16, 12);
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(location.x, location.y, location.z);
    mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    this.threeJsDrawable = mesh;
    
    this.boundingBox = new BoundingBox(location.x, size, location.y, size, location.z, size);
}

Projectile.prototype = Object.create(Drawable.prototype);
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function(deltaTime) {
    // TODO: remove this.
    return;
    
    if (this.done) return;
    
    if ((this.lifeMillis + deltaTime) > this.lifetime)
    {
        this.setDone(true);
        return;
    }
    ++this.lifeMillis;
    
    this.threeJsDrawable.translateZ(this.movementVector.z * deltaTime);
    // this.threeJsDrawable.position.x += (this.movementVector.x * deltaTime);
    // this.threeJsDrawable.position.y += (this.movementVector.y * deltaTime);
    // this.threeJsDrawable.position.z += (this.movementVector.z * deltaTime);
    
    this.boundingBox.xLeft += this.threeJsDrawable.position.x;
    this.boundingBox.yBottom += this.threeJsDrawable.position.y;
    this.boundingBox.zBack += this.threeJsDrawable.position.z;
    
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
    
    var position = position;
    var speed = new THREE.Vector3(13.5, 10.5, 13.5);
    var particleSize = 0.4;
    var particleLifetime = 1750;
    var particleCount = 200;

    var p = this.particleSystemPool.getExplosionParticleSystem(this.zone, lifetime, particleCount, 
            this.threeJsDrawable.position, particleSpeed, particleSize, 
            new THREE.Color("rgb(180, 0, 0)"), particleLifetime, ParticleSpread.SMALL);
    if (p !== null)
    {
        zone.addParticleSystem(p);
    }
    
    this.threeJsScene.remove(this);
};

Projectile.prototype.isDone = function() {
    return this.done;
};

Projectile.prototype.setDone = function(done) {
    this.done = done;
};
