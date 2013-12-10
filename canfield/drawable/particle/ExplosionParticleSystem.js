/**
 * @author Christopher D. Canfield
 * ExplosionParticleSystem.js
 * December 2013
 */


/**
 * A particle system that creates an explosion effect.
 * @param {Object} zone
 * @param {Object} threeJsScene
 * @param {Object} lifetime
 * @param {Object} particleCount
 * @param {Object} position The position of the particle system.
 * @param {Object} particleSpeed
 * @param {Object} particleSize
 * @param {Object} particleColor
 * @param {Object} particleLifetime
 * @param {boolean} debug Set to true if particles should not be added to the scene (Optional).
 */
function ExplosionParticleSystem(zone, threeJsScene, lifetime, particleCount, 
        position, particleSpeed, particleSize, particleColor, particleLifetime, debug) {
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
        // TODO: add particles.
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
