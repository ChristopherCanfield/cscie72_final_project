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
 * @param {Object} timePerRelease The time between particle releases, in milliseconds.
 * @param {Particle} particle A prototypical particle.
 * @param {ParticleSpread} particleSpread
 * @param {boolean} debug Set to true if particles should not be added to the scene (Optional).
 */
function ContinuousParticleSystem(zone, threeJsScene, particlesPerRelease, timePerRelease, particle, particleSpread, debug) {
    ParticleSystem.call(this);

    this.debug = debug;
    this.threeJsScene = (typeof debug !== "undefined" && debug) ? null : threeJsScene;
    this.zone = zone;
    
    this.prototypicalParticle = particle;
    this.particlesPerRelease = particlesPerRelease;
    this.timePerRelease = timePerRelease / 1000;
    this.spread = particleSpread;
    
    this.releaseTimeCounter = 0;
    
    for (var i = 0; i < particlesPerRelease; ++i)
    {
        this.addParticle();
    }
}

ContinuousParticleSystem.prototype = Object.create(ParticleSystem.prototype);
ContinuousParticleSystem.prototype.constructor = ContinuousParticleSystem;

ContinuousParticleSystem.prototype.superUpdate = ContinuousParticleSystem.prototype.update;


ContinuousParticleSystem.prototype.update = function(deltaTime) {
    if ((this.releaseTimeCounter + deltaTime) > this.timePerRelease)
    {
        for (var i = 0; i < this.particlesPerRelease; ++i)
        {
            this.addParticle();
        }
        this.releaseTimeCounter = 0;
    }
    this.releaseTimeCounter += deltaTime;

    // Call ParticleSystem's update method.
    this.superUpdate(deltaTime);
};

ContinuousParticleSystem.prototype.addParticle = function() {
    var position = this.adjustForSpread(this.prototypicalParticle.position, this.spread);
    var speed = MathHelper.adjustVector3(this.prototypicalParticle.speed, 0.9, 1.1);
    // The lifetime needs to be multiplied by 1000, because the particle constructor takes milliseconds, but the particle
    // stores the value in fractions of a second, in order to be consistent with THREE.Clock.
    var lifetime = MathHelper.randomInt(this.prototypicalParticle.lifetime * 1000 * 0.8, this.prototypicalParticle.lifetime * 1000 * 1.2);
    var p = new Particle(this, position, speed, this.prototypicalParticle.direction,
            this.prototypicalParticle.size, this.prototypicalParticle.color, lifetime);
    this.add(p);
};
