/**
 * @author Christopher D. Canfield
 * Projectile.js
 * December 2013
 */


/**
 * Creates a projectile.
 * @param {Zone} zone The zone that the projectile falls within.
 * @param {ParticleSystemPool} particleSystemPool 
 * @param {Camera} camera
 * @param {THREE.Vector3} movementVector
 * @param {THREE.Vector3} location
 * @param {float} size
 * @param {int} lifetime The max number of milliseconds that the project will live.
 * @param {string} texturePath
 * @param {int} textureRepeatX
 * @param {int} textureRepeatY
 */
function Projectile(zone, particleSystemPool, threeJsScene, camera,
        movementVector, rotation, location, size, lifetime, 
        texturePath, textureRepeatX, textureRepeatY) {
    Drawable.call(this);
    zone.addDrawable(this);
    this.zone = zone;
    this.threeJsScene = threeJsScene;
    this.camera = camera;
    
    this.movementVector = movementVector;
    this.particleSystemPool = particleSystemPool;
    
    this.lifetime = lifetime;
    this.lifeMillis = 0;
    
    this.done = false;
    
    var texture = cdc.textureManager.getTexture(texturePath);
    var material = new THREE.MeshPhongMaterial({ 
        map: texture
    });
    texture.repeat.set(textureRepeatX, textureRepeatY);
    
    this.geometry = new THREE.SphereGeometry(size, 16, 12);
    var outerDrawable = new THREE.Object3D();
    outerDrawable.position.set(location.x, location.y, location.z);
    outerDrawable.rotation.set(rotation.x, rotation.y, rotation.z);
    outerDrawable.translateZ(-20);
    outerDrawable.translateY(-5);
    this.mesh = new THREE.Mesh(this.geometry, material);
    outerDrawable.add(this.mesh);
    this.threeJsDrawable = outerDrawable;
    
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
    
    this.threeJsDrawable.translateZ(-this.movementVector.z * deltaTime);
    this.mesh.rotation.x -= 0.075;
    
    this.boundingBox.xLeft = this.threeJsDrawable.position.x;
    this.boundingBox.yBottom = this.threeJsDrawable.position.y;
    this.boundingBox.zBack = this.threeJsDrawable.position.z;
    
    var blockedAreas = this.zone.getBlockedAreas();
    for (var i = 0; i < blockedAreas.length; ++i)
    {
        if (blockedAreas[i].intersects(this.boundingBox))
        {
            this.onHit();
            return;
        }
    }
};

Projectile.prototype.onHit = function() {
    this.setDone(true);
    
    var lifetime = 3250;
    var position = position;
    var particleSpeed = new THREE.Vector3(7, 5, 7);
    var particleSize = 0.55;
    var particleLifetime = 2050;
    var particleCount = 250;

    var p = this.particleSystemPool.getExplosionSystem(this.zone, lifetime, particleCount, 
            this.threeJsDrawable.position, particleSpeed, particleSize, 
            new THREE.Color("rgb(180, 0, 0)"), particleLifetime, ParticleSpread.SMALL, this.camera);
    if (p !== null)
    {
        this.zone.addParticleSystem(p);
    }
};

Projectile.prototype.isDone = function() {
    return this.done;
};

Projectile.prototype.setDone = function(done) {
    this.done = done;
    this.threeJsScene.remove(this.threeJsDrawable);
};
