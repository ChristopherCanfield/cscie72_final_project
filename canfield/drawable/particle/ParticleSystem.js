/**
 * @author Christopher D. Canfield
 * ParticleSystem.js
 * November 2013
 */

// function ParticleSpread() {}
// ParticleSpread.SMALL = 0;
// ParticleSpread.SMALL_MEDIUM = 1;
// ParticleSpread.MEDIUM = 2;
// ParticleSpread.LARGE = 3;


/**
 * Base class for particle systems. 
 * @param {Zone} zone
 * @param {Object} threeJsScene
 */
function ParticleSystem(zone, threeJsScene) {
    this.particles = [];
    this.zone = zone;
    this.threeJsScene = threeJsScene;
    
    // An stack of the inactive particles.
    this.inactiveParticles = [];
    
    this.done = false;
    this.debug = false;
    
    this.id = ParticleSystem.nextId++;
}

ParticleSystem.nextId = 0;

/**
 * Adds a particle to the particle system and the three.js scene.
 * @param {Particle} particle The particle to add.
 */
ParticleSystem.prototype.add = function(particle) {
    this.particles.push(particle);
    if (this.threeJsScene !== null)
    {
        this.threeJsScene.add(particle.threeJsDrawable);
    }
};

/**
 * Completely removes a particle. For particle systems that generate additional
 * particles, this is less efficient than setting the particle to inactive, since
 * a removed particle cannot be reused.
 */
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

ParticleSystem.prototype.setDone = function(done, isParticlePoolMember) {
    this.done = done;
    
    if (done)
    {
        // Remove all particles when this particle system has finished.
        if (typeof isParticlePoolMember === "undefined" || !isParticlePoolMember)
        {
            for (var i = this.particles.length - 1; i >= 0; --i)
            {
                if (!this.debug)
                {
                    this.removeFromScene(this.particles[i]);
                }
            }
            this.particles.length = 0;
        }
        else
        {
            for (var i = 0; i < this.particles.length; ++i)
            {
                this.particles[i].setActive(false);
            }
        }
        this.zone.removeParticleSystem(this);
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
 * @param {THREE.Vector3} position
 * @param {THREE.Vector3} max The maximum additional x, y and z values that can be applied
 */
ParticleSystem.prototype.adjustForSpread = function(position, max) {
    if (typeof max === "undefined") throw "max must be specified in ParticleSystem.adjustForSpeed";
    
    return MathHelper.adjustVector3_2(position, new THREE.Vector3(), max);
};

/**
 * Returns an inactive particle, if one exists, or null.
 */
ParticleSystem.prototype.findInactive = function() {
    if (this.inactiveParticles.length > 0)
    {
        return this.inactiveParticles.pop();
    }
    return null;
};

ParticleSystem.prototype.addToInactive = function(particle) {
    this.inactiveParticles.push(particle);
};
