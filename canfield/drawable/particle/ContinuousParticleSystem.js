/**
 * @author Christopher D. Canfield
 * ContinuousParticleSystem.js
 * December 2013
 */


/**
 * Creates a paricle system that runs continuously.
 * @param {Object} zone
 * @param {Object} threeJsScene
 * @param {Object} particlesPerRelease
 * @param {Object} timePerRelease
 * @param {Particle} particle A prototypical particle.
 * @param {boolean} debug Set to true if particles should not be added to the scene (Optional).
 */
function ContinuousParticleSystem(zone, threeJsScene, particlesPerRelease, timePerRelease, particle, debug) {
    ParticleSystem.call(this);

    this.debug = debug;
    
    this.prototypicalParticle = particle;
    this.particlesPerRelease = particlesPerRelease;
    this.timePerRelease = timePerRelease;
    
    this.lastRelease = 0;
    
    if (typeof debug !== "undefined" && !debug)
    {
        // TODO: add particles.
    }
}

ContinuousParticleSystem.prototype = Object.create(ParticleSystem.prototype);
ContinuousParticleSystem.prototype.constructor = Particle;

ContinuousParticleSystem.prototype.superUpdate = ContinuousParticleSystem.prototype.update;

ContinuousParticleSystem.prototype.update = function(deltaTime) {
    if ((this.lastRelease + deltaTime) > this.timePerRelease)
    {
        // particleSystem, position, speed, direction, size, color, lifetime
        // TODO: adjust the position, speed, and lifetime of the particle.
        var p = new Particle(this, this.particle.position, this.particle.speed, this.particle.direction,
                this.particle.size, this.particle.color, this.particle.lifetime);
        this.add(p);
    }
    this.lastRelease += deltaTime;
    
    this.superUpdate(deltaTime);
};

