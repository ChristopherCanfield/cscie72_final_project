/**
 * @author Canfield
 */


function GameControlSheet(y, z) {
    THREE.Mesh.call(this);
    
    var texture = cdc.textureManager.getTexture(Textures.CONTROLS);
    texture.needsUpdate = true;
    this.material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true
    });
    texture.repeat.set(1, 1);
    
    this.geometry = new THREE.CubeGeometry(170, 85, 0.1);
    this.position.set(0, y, z);
};

GameControlSheet.prototype = Object.create(THREE.Mesh.prototype);
GameControlSheet.prototype.constructor = GameControlSheet;