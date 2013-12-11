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
 * @param {THREE.Vector3} direction -1, 0, or 1 for each direction.
 * @param {float} size The particle's radius.
 * @param {THREE.Color} color
 * @param {float} lifetime The number of milliseconds before the particle disappears.
 */
function Particle(particleSystem, position, speed, direction, size, color, lifetime) {
    Drawable.call(this);
    
    this.particleSystem = particleSystem;
    
    this.position = position;
    this.speed = speed;
    this.direction = direction;
    this.size = size;
    this.color = color;
    this.lifetime = lifetime / 1000;
    this.lifeMillis = 0;
    
    this.active = true;
    
    this.id = Particle.nextId++;
    
    // Create the drawable object.
    var radius = size;
    // These need to run fast, since there are often quite a few of them.
    var numberOfSegments = 1;
    this.geometry = new THREE.SphereGeometry(radius, numberOfSegments, numberOfSegments);
    
    var material = new THREE.MeshBasicMaterial({ 
        color : color
    });
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    this.threeJsDrawable = mesh;
}

Particle.prototype = Object.create(Drawable.prototype);
Particle.prototype.constructor = Particle;


/**
 * @param {THREE.Vector3} position
 * @param {THREE.Vector3} speed Speed per millisecond.
 * @param {THREE.Vector3} direction -1, 0, or 1 for each direction.
 * @param {int} lifetime The max life of the particle, in milliseconds.
 */
Particle.prototype.reset = function(position, speed, direction, lifetime) {
    this.position = position;
    this.speed = speed;
    this.direction = direction;
    this.lifetime = lifetime / 1000;
    this.lifeMillis = 0;
    
    this.threeJsDrawable.position.x = position.x;
    this.threeJsDrawable.position.y = position.y;
    this.threeJsDrawable.position.z = position.z;
    
    this.setActive(true);
};

/**
 *  
 * @param {int} deltaTime
 * @return {boolean} true if the particle was removed, or false otherwise.
 */
Particle.prototype.update = function(deltaTime) {
    if (this.active)
    {
        if ((this.lifeMillis + deltaTime) > this.lifetime)
        {
            this.setActive(false);
            //this.particleSystem.remove(this);
            return;
        }
        this.lifeMillis += deltaTime;
        
        this.threeJsDrawable.position.x += (this.speed.x * this.direction.x * deltaTime);
        this.threeJsDrawable.position.y += (this.speed.y * this.direction.y * deltaTime);
        this.threeJsDrawable.position.z += (this.speed.z * this.direction.z * deltaTime);
    }
};

Particle.prototype.equals = function(particle) {
    return (particle.id === this.id);
};

Particle.prototype.getId = function() {
    return this.id;
};

Particle.prototype.isActive = function() {
    return this.active;
};

Particle.prototype.setActive = function(active) {
    this.active = active;
    this.threeJsDrawable.visible = active;
    if (!active)
    {
        this.particleSystem.addToInactive(this);
    }
};


Particle.nextId = 0;
