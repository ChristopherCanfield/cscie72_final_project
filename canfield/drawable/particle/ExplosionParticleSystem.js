/**
 * @author Christopher D. Canfield
 * ExplosionParticleSystem.js
 * December 2013
 */


/**
 * A particle system that creates an explosion effect.
 * @param {Zone} zone
 * @param {Object} threeJsScene
 * @param {int} lifetime The lifetime of the particle system, in milliseconds.
 * @param {int} particleCount
 * @param {THREE.Vector3} position The position of the particle system.
 * @param {THREE.Vector3} particleSpeed
 * @param {int} particleSize
 * @param {THREE.Color} particleColor
 * @param {int} particleLifetime The lifetime of each particle, in milliseconds.
 * @param {ParticleSpread} particleSpread
 * @param {boolean} particlePoolMember (Optional)
 * @param {boolean} debug Set to true if particles should not be added to the scene (Optional).
 */
function ExplosionParticleSystem(zone, threeJsScene, lifetime, particleCount, 
        position, particleSpeed, particleSize, particleColor, particleLifetime, 
        particleSpread, particlePoolMember, debug) {
    ParticleSystem.call(this);

    this.threeJsScene = (typeof debug !== "undefined" && debug) ? null : threeJsScene;
    this.zone = zone;

    this.lifetime = lifetime / 1000;
    this.lifeMillis = 0;
    this.position = position;
    
    this.particleSpeed = particleSpeed;
    this.particleSize = particleSize;
    this.particleColor = particleColor;
    this.particleLifetime = particleLifetime;
    this.spread = particleSpread;
    
    this.particlePoolMember = particlePoolMember;
    this.inactiveParticles.length = 0;
    
    for (var i = 0; i < particleCount; ++i)
    {
        var position = this.adjustForSpread(this.position, this.spread);
        var speed = MathHelper.adjustVector3(this.particleSpeed, 0.4, 1.6);
        var direction = this.getRandomDirection();
        var lifetime = MathHelper.randomInt(0.8 * this.particleLifetime, 1.2 * this.particleLifetime);
        var launchTime = MathHelper.randomInt(0, particleLifetime / 2);
        
        var p = new Particle(this, position, speed, direction, particleSize, this.particleColor, lifetime, false);
        this.add(p);
    }
}

ExplosionParticleSystem.prototype = Object.create(ParticleSystem.prototype);
ExplosionParticleSystem.prototype.constructor = ExplosionParticleSystem;

ExplosionParticleSystem.prototype.superUpdate = ExplosionParticleSystem.prototype.update;


ExplosionParticleSystem.prototype.reset = function(zone, lifetime, particleCount, 
        position, particleSpeed, particleSize, particleColor, particleLifetime, particleSpread, camera) {
    this.zone = zone;
    zone.addParticleSystem(this);

    this.lifetime = lifetime / 1000;
    this.lifeMillis = 0;
    this.position = position;
    
    this.particleSpeed = particleSpeed;
    this.particleSize = particleSize;
    this.particleColor = particleColor;
    this.particleLifetime = particleLifetime;
    this.spread = particleSpread;
    
    var finalParticleCount = (particleCount > this.particles.length) ? this.particles.length : particleCount;
    
    for (var i = 0; i < finalParticleCount; ++i)
    {
        var position = this.adjustForSpread(this.position, this.spread);
        var speed = MathHelper.adjustVector3(this.particleSpeed, 0.3, 1.4);
        // TODO: adjust direction to prevent particles from being lost against the wall that caused
        // the collision.
        var direction = this.getRandomDirection();
        // this.adjustDirection(direction, position, camera);
        var lifetime = MathHelper.randomInt(0.8 * this.particleLifetime, 1.3 * this.particleLifetime);
        var launchTime = MathHelper.randomInt(0, particleLifetime / 2);
        
        var p = this.particles[i];
        p.reset(position, speed, direction, this.particleColor, lifetime, launchTime);
    }
    this.setDone(false);
};

ExplosionParticleSystem.prototype.update = function(deltaTime) {
    if ((this.lifeMillis + deltaTime) > this.lifetime)
    {
        this.setDone(true, this.particlePoolMember);
        return;
    }
    this.lifeMillis += deltaTime;
    
    // Call ParticleSystem's update method.
    this.superUpdate(deltaTime);
};

/**
 * 
 * @param {boolean} returnInteger true to return an integer, false or undefined to return a THREE.Vector3 (optional).
 */
ExplosionParticleSystem.prototype.getRandomDirection = function(returnInteger) {
    if (typeof returnInteger === 'undefined' || !returnInteger)
    {
        var x = this.getRandomDirection(true);
        var y = this.getRandomDirection(true);
        var z = this.getRandomDirection(true);
        return new THREE.Vector3(x, y, z);
    }
    else
    {
        var rand = MathHelper.randomInt(0, 2);
        return rand - 1;
    }      
};

// ExplosionParticleSystem.prototype.adjustDirection = function(direction, position, camera) {
    // var cameraPosition = camera.yawObject.position;
    // if (direction.x !== 0)
    // {
        // direction.x = (cameraPosition.x - (direction.x * position.x) > 0) ? -1 : 1;
    // }
    // if (direction.z !== 0)
    // {
        // direction.z = (cameraPosition.z - (direction.z * position.z) > 0) ? 1 : -1;
    // }
// };
