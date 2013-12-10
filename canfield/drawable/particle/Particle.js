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
    this.color = color;
    this.lifetime = lifetime;
    this.lifeMillis = 0;
    
    this.id = Particle.nextId++;
    
    // Create the drawable object.
    var radius = size;
    var numberOfSegments = 5;
    this.geometry = new THREE.SphereGeometry(radius, numberOfSegments, numberOfSegments);
    for (var i = 0; i < this.geometry.faces.length; ++i)
    {
        this.geometry.faces[i].vertexColors.push(color, color, color);
    }
    
    var material = new THREE.MeshBasicMaterial({ 
        vertexColors: THREE.VertexColors
    });
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    this.threeJsDrawable = mesh;
    
    // TODO: add to scene object. Get three.js scene from ParticleSystem.
}

Particle.prototype = Object.create(Drawable.prototype);
Particle.prototype.constructor = Particle;


/**
 *  
 * @param {int} deltaTime
 * @return {boolean} true if the particle was removed, or false otherwise.
 */
Particle.prototype.update = function(deltaTime) {
    if ((this.lifeMillis + deltaTime) > this.lifetime)
    {
        this.particleSystem.remove(this);
        return true;
    }
    this.lifeMillis += deltaTime;
    
    this.position.x += (this.speed.x * this.direction.x * deltaTime);
    this.position.y += (this.speed.y * this.direction.y * deltaTime);
    this.position.z += (this.speed.z * this.direction.z * deltaTime);
    return false;
};

Particle.prototype.equals = function(particle) {
    return (particle.id === this.id);
};

Particle.prototype.getId = function() {
    return this.id;
};

Particle.nextId = 0;
