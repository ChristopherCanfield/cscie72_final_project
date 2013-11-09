/**
 * @author Christopher D. Canfield
 * BallGuy.js
 */


function Bird() {
    Drawable.call(this);
    
    this.lastTargetChangeTime = 0;
    this.lastWingChangeTime = 0;
    this.wingModifier = 1;
    
    this.wrapper = new THREE.Object3D();
    this.wrapper.position.x = Math.round(Math.random() * 2000 - 1000);
    this.wrapper.position.z = Math.round(Math.random() * 2000 - 1000);
    this.wrapper.position.y = Math.round(Math.random() * 250 + 75);
    
    ///////// Create body. /////////
    var bodyTexture = cdc.textureManager.getTexture(Textures.METAL_3).clone();
    bodyTexture.needsUpdate = true;
    var bodyMaterial = new THREE.MeshBasicMaterial({ 
        map: bodyTexture
    });
    bodyTexture.repeat.set(1, 1);
    var bodyGeometry = new THREE.CubeGeometry(5, 5, 7);
    var bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    
    ///////// Create wings. /////////
    var wingTexture = cdc.textureManager.getTexture(Textures.METAL_7).clone();
    wingTexture.needsUpdate = true;
    var wingMaterial = new THREE.MeshBasicMaterial({ 
        map: wingTexture
    });
    wingTexture.repeat.set(1, 1);
    var wing1Geometry = new THREE.CubeGeometry(5, 1, 2);
    this.wing1Mesh = new THREE.Mesh(wing1Geometry, wingMaterial);
    this.wing1Mesh.position.x = -3;
    
    var wing2Texture = cdc.textureManager.getTexture(Textures.METAL_7).clone();
    wing2Texture.needsUpdate = true;
    var wing2Material = new THREE.MeshBasicMaterial({ 
        map: wing2Texture
    });
    wingTexture.repeat.set(1, 1);
    var wing2Geometry = new THREE.CubeGeometry(5, 1, 2);
    this.wing2Mesh = new THREE.Mesh(wing2Geometry, wing2Material);
    this.wing2Mesh.position.x = 3;
    
    this.threeJsSceneObject = this.wrapper;
    this.wrapper.add(bodyMesh);
    bodyMesh.add(this.wing1Mesh);
    bodyMesh.add(this.wing2Mesh);
    
    // Set target.
    this.targetX = Math.round(Math.random() * 2000 - 1000);
    this.targetZ = Math.round(Math.random() * 2000 - 1000);
    
    var angle = MathHelper.angleInRadians(this.targetX, this.targetZ,
            this.wrapper.position.x, this.wrapper.position.z);
    
    this.movementX = Math.cos(angle);
    this.movementZ = Math.sin(angle);
    
    this.rotationY = angle;
    
    var lookAtVector = new THREE.Vector3(this.targetX, this.wrapper.position.y, this.targetZ);
    this.wrapper.lookAt(lookAtVector);
}

Bird.prototype = Object.create(Drawable.prototype);
Bird.prototype.constructor = Bird;


Bird.prototype.animate = function(deltaTime) {
    // Update the BallChild's movement.
    this.wrapper.position.x += this.movementX * 0.2;
    this.wrapper.position.z += this.movementZ * 0.2;
    
    this.lastTargetChangeTime += deltaTime;
    this.lastWingChangeTime += deltaTime;
    
    if (this.lastWingChangeTime > 0.25)
    {
        this.wingModifier *= -1;
        this.lastWingChangeTime = 0;
    }
    this.wing1Mesh.rotation.z += (0.05 * this.wingModifier);
    this.wing2Mesh.rotation.z -= (0.05 * this.wingModifier);
    
    // Check to see if the BallChild is at the navigation target, and if it is, 
    // pick a new target.
    if (this.lastTargetChangeTime > 6.5)
    {
        this.lastTargetChangeTime = 0;
        
        this.targetX = Math.round(Math.random() * 2000 - 1000);
        this.targetZ = Math.round(Math.random() * 2000 - 1000);
        
        var angle = MathHelper.angleInRadians(this.targetX, this.targetZ,
                this.wrapper.position.x, this.wrapper.position.z);
    
        this.movementX = Math.cos(angle);
        this.movementZ = Math.sin(angle);
        
        this.rotationY = angle;
        
        var lookAtVector = new THREE.Vector3(this.targetX, this.wrapper.position.y, this.targetZ);
        this.wrapper.lookAt(lookAtVector);
    }
};