/**
 * @author Christopher D. Canfield
 * Hill.js
 */


function Hill(x, z, radius, texturePath, textureRepeat) {
    Drawable.call(this);
    
    var texture = cdc.textureManager.getTexture(texturePath);
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    texture.repeat.set(textureRepeat, textureRepeat);
    
    // this.geometry = new THREE.SphereGeometry(width, 10, 10, 0, Math.PI * 0.85, height, Math.PI * 0.85);
    this.geometry = new THREE.IcosahedronGeometry(radius, 1);
    
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(x, Ground.Y_TOP - 0.5, z);
    
    this.threeJsDrawable = mesh;
}

Hill.prototype = Object.create(Drawable.prototype);
Hill.prototype.constructor = Hill;
