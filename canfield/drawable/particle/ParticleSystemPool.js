/**
 * @author Christopher D. Canfield
 * ParticleSystemPool.js
 * December 2013
 */


function ParticleSystemPool(threeJsScene) {
    this.threeJsScene = threeJsScene;
    
    this.explosionParticleSystems = [];
    this.explosionParticleSystems.push(new ExplosionParticleSystem());
    this.explosionParticleSystems.push(new ExplosionParticleSystem());
    this.explosionParticleSystems.push(new ExplosionParticleSystem());
    this.explosionParticleSystems.push(new ExplosionParticleSystem());
    this.explosionParticleSystems.push(new ExplosionParticleSystem());
    this.explosionParticleSystems.push(new ExplosionParticleSystem());
};

ParticleSystemPool.prototype.getExplosionSystem = function(zone, threeJsScene, lifetime, particleCount, 
        position, particleSpeed, particleSize, particleColor, particleLifetime, particleSpread, debug) {
    for (var i = 0; i < this.explosionParticleSystems.length; ++i)
    {
        if (this.explosionParticleSystems[i].isDone())
        {
            // TODO: complete this.
        }
    }
};
