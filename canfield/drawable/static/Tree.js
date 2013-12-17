/**
 * @author Christopher D. Canfield
 * Tree.js
 */


/**
 * A tree.
 * @param {Zone} zone The zone that the tree belongs to.
 * @param {Object} x
 * @param {Object} z
 * @param {Object} height 
 * @param {Object} barkTexturePath
 * @param {Object} leavesRadius
 * @param {Object} leavesTexturePath
 * @param {integer} leavesTextureRepeat The number of times to repeat the leaves texture.
 */
function Tree(x, z, height, barkTexturePath, 
        leavesRadius, leavesTexturePath, leavesTextureRepeat, zone) {
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
    
    this.threeJsDrawable = mesh;
    
    // Add the leaves
    var leavesTexture = cdc.textureManager.getTexture(leavesTexturePath);
    var leavesMaterial = new THREE.MeshLambertMaterial({
        map: leavesTexture
    });
    leavesTexture.repeat.set(leavesTextureRepeat, leavesTextureRepeat);
    
    var leavesGeometry = new THREE.SphereGeometry(leavesRadius, 12, 8);
    var leavesMesh = new THREE.Mesh(leavesGeometry, leavesMaterial);
    this.threeJsDrawable.add(leavesMesh);
    
    leavesMesh.position.x = x;
    leavesMesh.position.y = height;
    leavesMesh.position.z = z;
    
    zone.addDrawable(this);
    
    this.blockedArea = new BlockedArea(new BoundingBox(x, 20, 0, height, z, 20));
    if (typeof zone != 'undefined' && this.blockedArea != null)
    {
        zone.addBlockedArea(this.blockedArea);
    }
}

Tree.prototype = Object.create(Drawable.prototype);
Tree.prototype.constructor = Tree;
