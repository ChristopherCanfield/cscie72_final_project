/**
 * @author Christopher D. Canfield
 * Particle.js
 * November 2013
 * Adapted from William Reeves, "Particle Systems - A Technique for
 *      Modelling a Class of Fuzzy Objects". ACM Transactions on Graphics,
 *      vol 2, no 2, April 1983.
 */


/**
 * 
 * @param {ParticleSystem} particleSystem
 * @param {THREE.Vector3} position
 * @param {THREE.Vector3} speed Speed per millisecond.
 * @param {THREE.Vector3} direction
 * @param {float} size
 * @param {THREE.Color} color
 * @param {float} lifetime The number of milliseconds before the particle disappears.
 */
function Particle(particleSystem, position, speed, direction, size, color, lifetime) {
    this.particleSystem = particleSystem;
    
    this.position = position;
    this.speed = speed;
    this.direction = direction;
    this.size = size;
    this.color = color;
    this.lifetime = lifetime;
    this.lifeMillis = 0;
    
    this.id = Particle.nextId++;
    
    // TODO: inherit from drawable, create geometry object, and add
    // to scene object. Get three.js scene from ParticleSystem.
}


Particle.prototype.update = function(deltaTime) {
    if ((this.lifeMillis + deltaTime) > this.lifetime)
    {
        this.particleSystem.remove(this);
        return;
    }
    this.lifeMillis += deltaTime;
    
    this.position.x += (this.speed.x * this.direction.x * deltaTime);
    this.position.y += (this.speed.y * this.direction.y * deltaTime);
    this.position.z += (this.speed.z * this.direction.z * deltaTime);
};

Particle.prototype.equals = function(particle) {
    return (particle.id === this.id);
};

Particle.prototype.getId = function() {
    return this.id;
};

Particle.nextId = 0;
