/**
 * @author Christopher D. Canfield
 * ParticleSystemPool.js
 * December 2013
 */


function ParticleSystemPool() {
    this.explosionParticleSystems = [];
    // add particle systems
};

ParticleSystemPool.prototype.getExplosionSystem = function() {
    for (var i = 0; i < this.explosionParticleSystems.length; ++i)
    {
        if (this.explosionParticleSystems[i].isDone())
        {
            // TODO: complete this.
        }
    }
};
