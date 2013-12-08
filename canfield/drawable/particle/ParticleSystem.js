/**
 * @author Christopher D. Canfield
 * ParticleSystem.js
 * November 2013
 */



function ParticleSystem(zone, threeJsScene) {
    this.zone = zone;
    this.particles = {};
    this.threeJsScene = threeJsScene;
}


ParticleSystem.prototype.add = function(particle) {
    this.particles.push(particle);
};

ParticleSystem.prototype.remove = function(particle) {
    for (var i = 0; i < this.particles.length; ++i)
    {
        if (this.particles.equals(particle))
        {
            this.particles.splice(i, 1);
            return;
        }
    }
    throw "ParticleSystem.remove: Unable to find particle " + particle.getId();
};


ParticleSystem.prototype.updateParticles = function(deltaTime) {
    for (var i = 0; i < this.particles.length; ++i)
    {
        this.particles[i].update(deltaTime);
    }
};
