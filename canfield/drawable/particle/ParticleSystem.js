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


ParticleSystem.prototype.updateParticles = function(deltaTime) {
    for (var i = 0; i < this.particles.length; ++i)
    {
        this.particles[i].update(deltaTime);
    }
};
