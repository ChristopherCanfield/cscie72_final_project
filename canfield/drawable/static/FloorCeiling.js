/**
 * @author Christopher D. Canfield
 * FloorCeiling.js
 */


function FloorCeiling(xLeft, yBottom, zBack, width, height, depth, texturePath, textureRepeatX, textureRepeatY) {
    Drawable.call(this);
    
    this.geometry.computeFaceNormals();
    this.geometry.computeCentroids();
    this.geometry.computeVertexNormals();
    
    var texture = cdc.textureManager.getTexture(Textures.GROUND_GRASS_MUD).clone();
    texture.needsUpdate = true;
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    texture.repeat.set(20, 20);
    
    this.geometry = new THREE.CubeGeometry(width, height, depth);
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(xLeft + (width / 2), yBottom + (height / 2) - 0.5, zBack - (depth / 2));
    
    this.threeJsDrawable = mesh;
    
    zone.addDrawable(this);
}

FloorCeiling.prototype = Object.create(Drawable.prototype);
FloorCeiling.prototype.constructor = FloorCeiling;