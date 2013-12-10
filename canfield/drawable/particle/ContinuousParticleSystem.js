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
 */
function ContinuousParticleSystem(zone, threeJsScene, particlesPerRelease, timePerRelease, particle) {
    ParticleSystem.call(this);
    
    this.particles = [];
    this.zone = zone;
    this.threeJsScene = threeJsScene;
    this.prototypicalParticle = particle;
    
    this.lastRelease = 0;
    
    // TODO: add particles.
}

ContinuousParticleSystem.prototype = Object.create(ParticleSystem.prototype);
ContinuousParticleSystem.prototype.constructor = Particle;

ContinuousParticleSystem.prototype.superUpdate = ContinuousParticleSystem.prototype.update;

ContinuousParticleSystem.prototype.update = function(deltaTime) {
    if ((this.lastRelease + deltaTime) > this.timePerRelease)
    {
        // TODO: add particles.
    }
    this.lastRelease += deltaTime;
    
    this.superUpdate(deltaTime);
};
