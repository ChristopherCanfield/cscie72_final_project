/**
 * @author Christopher D. Canfield
 * ParticleSystem.js
 * November 2013
 */



function ParticleSystem(zone) {
    this.zone = zone;
    this.particles = {};
}


ParticleSystem.prototype.add = function(particle) {
    this.particles.push(particle);
};
