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
 * @param {ParticleSpread} particleSpread
 * @param {boolean} debug Set to true if particles should not be added to the scene (Optional).
 */
function ContinuousParticleSystem(zone, threeJsScene, particlesPerRelease, timePerRelease, particle, particleSpread, debug) {
    ParticleSystem.call(this);

    this.debug = debug;
    
    this.prototypicalParticle = particle;
    this.particlesPerRelease = particlesPerRelease;
    this.timePerRelease = timePerRelease;
    this.spread = particleSpread;
    
    this.lastRelease = 0;
    
    if (typeof debug !== "undefined" && !debug)
    {
        this.addParticle();
    }
}

ContinuousParticleSystem.prototype = Object.create(ParticleSystem.prototype);
ContinuousParticleSystem.prototype.constructor = Particle;

ContinuousParticleSystem.prototype.superUpdate = ContinuousParticleSystem.prototype.update;


ContinuousParticleSystem.prototype.update = function(deltaTime) {
    if ((this.lastRelease + deltaTime) > this.timePerRelease)
    {
        this.addParticle();
    }
    this.lastRelease += deltaTime;
    
    this.superUpdate(deltaTime);
};

ContinuousParticleSystem.prototype.addParticle = function() {
    var position = this.adjustForSpread(this.prototypicalParticle.position, this.spread);
    var speed = MathHelper.adjustVector3(this.prototypicalParticle.speed, 0.9, 1.1);
    var lifetime = MathHelper.adjustVector3(this.prototypicalParticle.lifetime, 0.9, 1.1);
    var p = new Particle(this, position, speed, this.prototypicalParticle.direction,
            this.prototypicalParticle.size, this.prototypicalParticle.color, lifetime);
    this.add(p);
};
