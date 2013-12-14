/**
 * @author Christopher D. Canfield
 * FloorCeiling.js
 */


function FloorCeiling(xLeft, yBottom, zBack, width, height, depth, texturePath, textureRepeatX, textureRepeatY) {
    Drawable.call(this);
    
    var texture = cdc.textureManager.getTexture(texturePath).clone();
    texture.needsUpdate = true;
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    texture.repeat.set(textureRepeatX, textureRepeatY);
    
    this.geometry = new THREE.CubeGeometry(width, height, depth);
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(xLeft - width / 2, yBottom, zBack - depth / 2);
    
    this.threeJsDrawable = mesh;
}

FloorCeiling.prototype = Object.create(Drawable.prototype);
FloorCeiling.prototype.constructor = FloorCeiling;