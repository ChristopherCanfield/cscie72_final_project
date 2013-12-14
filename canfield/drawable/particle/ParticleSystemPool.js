/**
 * @author Christopher D. Canfield
 * ParticleSystemPool.js
 * December 2013
 */


function ParticleSystemPool(threeJsScene, poolSize, particlesPerSystem) {
    this.threeJsScene = threeJsScene;
    
    this.explosionParticleSystems = [];
    this.poolSize = poolSize;
};

/**
 * Gets a particle system from the pool. Note: returns null if no particle system is free.
 * @param {Zone} zone
 * @param {int} lifetime
 * @param {int} particleCount
 * @param {THREE.Vector3} position
 * @param {THREE.Vector3} particleSpeed
 * @param {float} particleSize
 * @param {THREE.Color} particleColor
 * @param {int} particleLifetime
 * @param {ParticleSpread} particleSpread
 */
ParticleSystemPool.prototype.getExplosionSystem = function(zone, lifetime, particleCount, 
        position, particleSpeed, particleSize, particleColor, particleLifetime, particleSpread) {
    // Search for an initialized but currently unused particle system.
    for (var i = 0; i < this.explosionParticleSystems.length; ++i)
    {
        if (this.explosionParticleSystems[i].isDone())
        {
            var e = this.explosionParticleSystems[i];
            e.reset(zone, lifetime, position, particleSpeed, particleSize, particleColor, 
                    particleLifetime, particleSpread);
            return e;
        }
    }

    // If pool hasn't yet grown to maximum size, add another particle system to it.
    if (this.explosionParticleSystems.length < poolSize)
    {
        var e = new ExplosionParticleSystem(zone, threeJsScene, lifetime, particleCount,
                position, particleSpeed, particleSize, particleColor, particleLifetime, particleSpread, true);
        this.poolSize.push(e);
        return e;
    }
    
    // If no particle system is available, return null.
    return null;
};

