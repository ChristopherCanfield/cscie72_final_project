/**
 * @author Christopher D. Canfield
 * ExplosionParticleSystem.js
 * December 2013
 */


/**
 * A particle system that creates an explosion effect.
 * @param {Zone} zone
 * @param {Object} threeJsScene
 * @param {int} lifetime
 * @param {int} particleCount
 * @param {THREE.Vector3} position The position of the particle system.
 * @param {THREE.Vector3} particleSpeed
 * @param {int} particleSize
 * @param {THREE.Color} particleColor
 * @param {int} particleLifetime
 * @param {ParticleSpread} particleSpread
 * @param {boolean} debug Set to true if particles should not be added to the scene (Optional).
 */
function ExplosionParticleSystem(zone, threeJsScene, lifetime, particleCount, 
        position, particleSpeed, particleSize, particleColor, particleLifetime, particleSpread, debug) {
    ParticleSystem.call(this);
    
    this.particles = [];
    this.zone = zone;
    this.threeJsScene = threeJsScene;
    this.lifetime = lifetime;
    this.lifeMillis = 0;
    this.position = position;
    
    this.particleSpeed = particleSpeed;
    this.particleSize = particleSize;
    this.particleColor = particleColor;
    this.particleLifetime = particleLifetime;
    
    if (typeof debug !== "undefined" && !debug)
    {
        var position = this.adjustForSpread(this.position, this.spread);
        var speed = MathHelper.adjustVector3(this.particleSpeed, 0.8, 1.2);
        var direction = this.getRandomDirection();
        var lifetime = MathHelper.adjustVector3(this.particleLifetime, 0.8, 1.2);
        var p = new Particle(this, position, speed, direction, particleSize, this.prototypicalParticle.color, lifetime);
        this.add(p);
    }
}

ExplosionParticleSystem.prototype = Object.create(ParticleSystem.prototype);
ExplosionParticleSystem.prototype.constructor = Particle;

ExplosionParticleSystem.prototype.superUpdate = ExplosionParticleSystem.prototype.update;

ExplosionParticleSystem.prototype.update = function(deltaTime) {
    if ((this.lifeMillis + deltaTime) > this.lifetime)
    {
        this.setDone(true);
        return;
    }
    this.lifeMillis += deltaTime;
    
    // TODO: test this.
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
