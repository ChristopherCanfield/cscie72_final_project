/**
 * @author Christopher D. Canfield
 * FloatingFace.js
 * December 2013
 */



/**
 * 
 * @param {float} x
 * @param {float} y
 * @param {float} z
 */
function FloatingFace(x, y, z) {
    THREE.Mesh.call(this);
    
    var texture = cdc.textureManager.getTexture(Textures.MASK_3);

    this.material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true
    });
    texture.repeat.set(1, 1);
    
    this.geometry = new THREE.SphereGeometry(50);
    this.position.set(x, y, z);
};

FloatingFace.prototype = Object.create(THREE.Mesh.prototype);
FloatingFace.prototype.constructor = FloatingFace;