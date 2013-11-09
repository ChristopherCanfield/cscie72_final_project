/**
 * @author Christopher D. Canfield
 * Tree.js
 */


/**
 * Creates a tree.
 * @param {Object} x
 * @param {Object} z
 * @param {Object} height
 * @param {Object} barkTexturePath
 * @param {Object} leavesRadius
 * @param {Object} leavesTexturePath
 * @param {integer} leavesTextureRepeat
 */
function Tree(x, z, height, barkTexturePath, leavesRadius, leavesTexturePath, leavesTextureRepeat) {
    Drawable.call(this);
    
    var texture = cdc.textureManager.getTexture(barkTexturePath);
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    texture.repeat.set(2, 2);
    
    var path = new THREE.SplineCurve3([
            new THREE.Vector3(x, -5, z), 
            new THREE.Vector3(x, height, z)]);
    this.geometry = new THREE.TubeGeometry(path, 20, 3);
    
    var mesh = new THREE.Mesh(this.geometry, material);
    
    this.threeJsSceneObject = mesh;
    
    // Add the leaves
    var leavesTexture = cdc.textureManager.getTexture(leavesTexturePath);
    var leavesMaterial = new THREE.MeshLambertMaterial({
        map: leavesTexture
    });
    leavesTexture.repeat.set(leavesTextureRepeat, leavesTextureRepeat);
    
    var leavesGeometry = new THREE.TetrahedronGeometry(leavesRadius, 2);
    var leavesMesh = new THREE.Mesh(leavesGeometry, leavesMaterial);
    this.threeJsSceneObject.add(leavesMesh);
    
    leavesMesh.position.x = x;
    leavesMesh.position.y = Ground.Y_TOP + height;
    leavesMesh.position.z = z;
}

Tree.prototype = Object.create(Drawable.prototype);
Tree.prototype.constructor = Tree;
