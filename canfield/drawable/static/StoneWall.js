/**
 * @author Christopher D. Canfield
 * StoneWall.js
 */


function StoneWall(x, z, width, height, depth, texturePath, textureRepeatX, textureRepeatY, textureRepeatXTop) {
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
    this.threeJsDrawable = mesh;
    
    // Top
    var texture2 = cdc.textureManager.getTexture(texturePath).clone();
    texture2.needsUpdate = true;
    var material2 = new THREE.MeshLambertMaterial({ 
        map: texture2
    });
    texture2.repeat.set(textureRepeatXTop, 1);
   
    var geometry2 = new THREE.CubeGeometry(width, 1, depth);
    var mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.set(0, 15, 0);
    this.threeJsDrawable.add(mesh2);
    
    // TODO: fix textures on the ends.
}

StoneWall.prototype = Object.create(Drawable.prototype);
StoneWall.prototype.constructor = StoneWall;
