/**
 * @author Christopher D. Canfield
 * WallDrape.js
 * December 2013
 */

function WallDrapeColor() {}
WallDrapeColor.BLUE = 0;
WallDrapeColor.RED = 1;

/**
 * 
 * @param {float} x
 * @param {float} y
 * @param {float} z
 * @param {boolean} northSouth
 * @param {WallDrapeColor} wallDrapeColor (optional)
 */
function WallDrape(x, y, z, northSouth, wallDrapeColor) {
    THREE.Mesh.call(this);
    
    var texturePath = (typeof wallDrapeColor === "undefined" || wallDrapeColor === WallDrapeColor.BLUE) ? 
            Textures.WALLDECORATION_2 : Textures.WALLDECORATION_3;
    var texture = cdc.textureManager.getTexture(texturePath);

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