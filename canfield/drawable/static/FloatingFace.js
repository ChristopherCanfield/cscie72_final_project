/**
 * @author Christopher D. Canfield
 * WallDrape.js
 * December 2013
 */

function WallDrapeColor() {}
WallDrapeColor.BLUE = 0;
WallDrapeColor.RED = 1;
WallDrapeColor.GOLDLEAF = 2;

/**
 * Converts a wall drape color into a texture path. 
 */
WallDrapeColor.colorToTexturePath = function(wallDrapeColor) {
    if (typeof wallDrapeColor === "undefined" || wallDrapeColor === WallDrapeColor.BLUE)
    {
        return Textures.WALLDECORATION_2;
    }
    else if (wallDrapeColor === WallDrapeColor.RED)
    {
        return Textures.WALLDECORATION_3;
    }
    else if (wallDrapeColor === WallDrapeColor.GOLDLEAF)
    {
        return Textures.WALLDECORATION_4;
    }
};

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
    
    var texture = cdc.textureManager.getTexture(WallDrapeColor.colorToTexturePath(wallDrapeColor));

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