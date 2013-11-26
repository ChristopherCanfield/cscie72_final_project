/**
 * @author Christopher D. Canfield
 * BuildingWall.js
 * November 2013
 */



/**
 * Creates an impassable wall.
 * @param {float} x
 * @param {float} z
 * @param {float} width
 * @param {float} height
 * @param {float} depth
 * @param {String} texturePath
 * @param {int} textureRepeatX
 * @param {int} textureRepeatY
 * @param {Zone} zone The zone that the wall falls within.
 */
function BuildWall(x, z, width, height, depth, texturePath, textureRepeatX, textureRepeatY, zone) {
    Drawable.call(this);
    
    // Front & Back
    var texture = cdc.textureManager.getTexture(texturePath);
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    texture.repeat.set(textureRepeatX, textureRepeatY);
    
    this.geometry = new THREE.CubeGeometry(width, height, depth);
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(x, Ground.Y_TOP - 0.5, z);
    this.threeJsSceneObject = mesh;
    
    // Prevent camera from walking through wall.
    this.blockedArea = new BlockedArea(new BoundingBox(x, width, y, height, z, depth));
    zone.addBlockedArea.push(this.blockedArea);
}


BuildWall.prototype = Object.create(Drawable.prototype);
BuildWall.prototype.constructor = BuildWall;