/**
 * @author Christopher D. Canfield
 * WallDrape.js
 * December 2013
 */


/**
 * 
 * @param {float} x
 * @param {float} y
 * @param {float} z
 * @param {boolean} northSouth
 */
function WallDrape(x, y, z, northSouth) {
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
        this.geometry = new THREE.CubeGeometry(30, 75, 0.15);
    }
    else
    {
        this.geometry = new THREE.CubeGeometry(0.15, 75, 30);
    }

    this.position.set(x, y, z);
};

WallDrape.prototype = Object.create(THREE.Mesh.prototype);
WallDrape.prototype.constructor = WallDrape;