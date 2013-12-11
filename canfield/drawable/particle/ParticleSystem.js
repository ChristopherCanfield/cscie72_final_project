/**
 * @author Christopher D. Canfield
 * ParticleSystem.js
 * November 2013
 */

function ParticleSpread() {}
ParticleSpread.SMALL = 0;
ParticleSpread.MEDIUM = 1;
ParticleSpread.LARGE = 2;


/**
 * Base class for particle systems. 
 * @param {Zone} zone
 * @param {Object} threeJsScene
 */
function ParticleSystem(zone, threeJsScene) {
    this.particles = [];
    this.zone = zone;
    this.threeJsScene = threeJsScene;
    
    this.done = false;
}


ParticleSystem.prototype.add = function(particle) {
    this.particles.push(particle);
    if (this.threeJsScene !== null)
    {
        this.threeJsScene.add(particle.threeJsDrawable);
    }
};

ParticleSystem.prototype.remove = function(particle) {
    for (var i = 0; i < this.particles.length; ++i)
    {
        if (this.particles[i].equals(particle))
        {
            this.removeFromScene(particle);
            this.particles.splice(i, 1);
            return;
        }
    }
    throw "ParticleSystem.remove: Unable to find particle " + particle.getId();
};


ParticleSystem.prototype.update = function(deltaTime) {
    for (var i = 0; i < this.particles.length; ++i)
    {
        if (this.particles[i].isActive())
        {
            this.particles[i].update(deltaTime);
        }
    }
};

ParticleSystem.prototype.setDone = function(done) {
    this.done = done;
    // Remove all particles when this particle system has finished.
    for (var i = this.particles.length - 1; i >= 0; --i)
    {
        this.remove(this.particles[i]);
    }
};

ParticleSystem.prototype.isDone = function() {
    return this.done;
};

ParticleSystem.prototype.removeFromScene = function(particle) {
    if (this.threeJsScene != null)
    {
        this.threeJsScene.remove(particle.threeJsDrawable);   
    }    
};

/**
 * 
 * @param {THREE.Vector3} position
 */
ParticleSystem.prototype.adjustForSpread = function(position, spread) {
    if (spread === ParticleSpread.SMALL)
    {
        return MathHelper.adjustVector3(position, 0.9, 1.1);
    }
    else if (spread === ParticleSpread.MEDIUM)
    {
        return MathHelper.adjustVector3(position, 0.8, 1.2);
    }
    else if (spread === ParticleSpread.LARGE)
    {
        return MathHelper.adjustVector3(position, 0.7, 1.3);
    }
    else
    {
        throw "ParticleSystem.adjustForSpread: Invalid ParticleSpread value: " + this.spread;
    }
};