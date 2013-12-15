/**
 * @author Christopher D. Canfield
 * WindowFancy.js
 * December 2013
 */


/**
 * 
 * @param {float} x
 * @param {float} y
 * @param {float} z
 * @param {boolean} northSouth
 */
function WindowFancy(x, y, z, northSouth) {
    THREE.Mesh.call(this);
    
    var texture = cdc.textureManager.getTexture(Textures.WALLDECORATION_1);
    texture.needsUpdate = true;
    this.material = new THREE.MeshLambertMaterial({ 
        map: texture,
        transparent: true
    });
    texture.repeat.set(1, 1);
    
    if (northSouth)
    {
        this.geometry = new THREE.CubeGeometry(30, 75, 37);
    }
    else
    {
        this.geometry = new THREE.CubeGeometry(37, 75, 300);
    }
    this.position.set(x, y, z);
};

WindowFancy.prototype = Object.create(THREE.Mesh.prototype);
WindowFancy.prototype.constructor = WindowFancy;