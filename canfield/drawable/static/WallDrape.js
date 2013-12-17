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
    
    var texture = cdc.textureManager.getTexture(Textures.WALLDECORATION_2);

    this.material = new THREE.MeshBasicMaterial({ 
        map: texture
    });
    texture.repeat.set(1, 6);
    
    if (northSouth)
    {
        this.geometry = new THREE.CubeGeometry(15, 60, 0.15);
    }
    else
    {
        this.geometry = new THREE.CubeGeometry(0.15, 60, 15);
    }

    this.position.set(x, y, z);
};

WallDrape.prototype = Object.create(THREE.Mesh.prototype);
WallDrape.prototype.constructor = WallDrape;