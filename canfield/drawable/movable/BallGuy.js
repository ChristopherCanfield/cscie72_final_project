/**
 * @author Christopher D. Canfield
 * BallGuy.js
 * October 2013
 */


function BallGuy(scene, navGraph, initialNavPointTarget, lastNavPointId, x, z) {
    Drawable.call(this);
    
    this.scene = scene;
    
    this.wrapper = new THREE.Object3D();
    this.wrapper.position.x = x;
    this.wrapper.position.z = z;
    this.wrapper.position.y = 13;
    
    /////// Create ball. ////////
    var ballTexture = cdc.textureManager.getTexture(Textures.METAL_5);
    var ballMaterial = new THREE.MeshLambertMaterial({ 
        map: ballTexture
    });
    ballTexture.repeat.set(2, 2);
    
    var ballGeometry = new THREE.SphereGeometry(8, 15, 15, 0, Math.PI * 2, 0, Math.PI);
    this.ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    this.ballMesh.position.set(0, 0, 0);
    
    ///////// Create body. /////////
    var bodyTexture = cdc.textureManager.getTexture(Textures.RUST_8);
    var bodyMaterial = new THREE.MeshLambertMaterial({ 
        map: bodyTexture
    });
    bodyTexture.repeat.set(1, 1);
    
    var bodyGeometry = new THREE.CubeGeometry(17, 20, 17);
    this.bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.bodyMesh.position.set(0, 10, 0);
    
    /////// Create eyes. //////////
    var eyeMaterial = new THREE.MeshLambertMaterial({
        color: 0xFFD800,
        emissive: 0xFFD800
    });
    
    var eye1Geometry = new THREE.CubeGeometry(2, 2, 4);
    var eye1Mesh = new THREE.Mesh(eye1Geometry, eyeMaterial);
    eye1Mesh.position.x = -5;
    eye1Mesh.position.y = 8;
    eye1Mesh.position.z = 8;
    
    var eye2Geometry = new THREE.CubeGeometry(2, 2, 4);
    var eye2Mesh = new THREE.Mesh(eye2Geometry, eyeMaterial);
    eye2Mesh.position.x = 5;
    eye2Mesh.position.y = 8;
    eye2Mesh.position.z = 8;
    
    //////// Create arms. ///////
    this.upperArm1 = this.createUpperArm(-10);
    this.upperArm1.rotation.x = 3;
    this.upperArm2 = this.createUpperArm(10);
    this.upperArm2.rotation.x = 1;
    
    this.lowerArm1 = this.createLowerArm(-10);
    this.lowerArm2 = this.createLowerArm(10);
    
    this.timeSinceArmSwitch = 0.0;
    this.armModifier = 1;
    
    // Add to scene.
    this.threeJsDrawable = this.wrapper;
    this.wrapper.add(this.bodyMesh);
    
    this.bodyMesh.add(eye1Mesh);
    this.bodyMesh.add(eye2Mesh);

    this.bodyMesh.add(this.upperArm1);
    this.upperArm1.add(this.lowerArm1);

    this.bodyMesh.add(this.upperArm2);
    this.upperArm2.add(this.lowerArm2);
    
    this.wrapper.add(this.ballMesh);
    
    // Add bounding box.
    // TODO (2013-11-13): BoundingBox's y and z parameters have been changed to bottom and back, 
    // from top and bottom. This needs to be fixed.
    this.boundingBox = new BoundingBox(x, 20, 20, 20, z, 20);
    
    // Set the navigation target.
    this.navGraph = navGraph;
    this.lastNavTargetId = lastNavPointId;
    this.currentNavTarget = initialNavPointTarget;
    this.setMovement();
    this.navigationBoundingBox = new BoundingBox(this.wrapper.position.x, 5,
            0, 10, this.wrapper.position.z, 5);
    var lookAtVector = new THREE.Vector3(this.currentNavTarget.x, 0, this.currentNavTarget.z);
    this.wrapper.lookAt(lookAtVector);
}

BallGuy.prototype = Object.create(Drawable.prototype);
BallGuy.prototype.constructor = BallGuy;


BallGuy.prototype.updateThis = function(deltaTime) {
    if (this.movementX > 0.001)
    {
        this.ballMesh.rotation.z += 0.008 * this.movementX;
    }
    else if (this.movementX < 0.001)
    {
        this.ballMesh.rotation.z -= 0.008 * this.movementX;
    }
    
    if (this.movementZ > 0.001)
    {
        this.ballMesh.rotation.x += 0.008 * this.movementZ;
    }
    else if (this.movementZ < 0.001)
    {
        this.ballMesh.rotation.x -= 0.008 * this.movementZ;
    }
    
    this.timeSinceArmSwitch += deltaTime;
    if (this.timeSinceArmSwitch > 1)
    {
        this.armModifier *= -1.0;
        this.timeSinceArmSwitch = 0;
    }
    
    this.upperArm1.rotation.x -= (0.02 * this.armModifier);
    this.upperArm2.rotation.x += (0.02 * this.armModifier);
    
    // Update the BallGuy's movement.
    this.wrapper.position.x += this.movementX * 0.25;
    this.navigationBoundingBox.xLeft += this.movementX * 0.25; 
    this.boundingBox.xLeft += this.movementX * 0.25;
    
    this.wrapper.position.z += this.movementZ * 0.25;
    this.navigationBoundingBox.zFront += this.movementZ * 0.25;
    this.boundingBox.zFront += this.movementZ * 0.25;
    
    // Check to see if the BallGuy is at the navigation target, and if it is, 
    // pick a new target.
    if (this.isAtNavTarget())
    {
        this.setRandomNavPointTarget();
        this.setMovement();
        
        var lookAtVector = new THREE.Vector3(this.currentNavTarget.x, 0, this.currentNavTarget.z);
        this.wrapper.lookAt(lookAtVector);
    }
    
    this.checkForCollision();
};


BallGuy.prototype.createUpperArm = function(x) {
    var armTexture = cdc.textureManager.getTexture(Textures.RUST_2).clone();
    armTexture.needsUpdate = true;
    var armMaterial = new THREE.MeshLambertMaterial({ 
        map: armTexture
    });
    armTexture.repeat.set(1, 1);
    
    var armGeometry = new THREE.CubeGeometry(20, 2, 2);
    var armMesh = new THREE.Mesh(armGeometry, armMaterial);
    armMesh.position.set(x, 3, 0);
    
    return armMesh;
};

BallGuy.prototype.createLowerArm = function(x) {
    var armTexture = cdc.textureManager.getTexture(Textures.RUST_2).clone();
    armTexture.needsUpdate = true;
    var armMaterial = new THREE.MeshLambertMaterial({ 
        map: armTexture
    });
    armTexture.repeat.set(1, 1);
    
    var armGeometry = new THREE.CubeGeometry(3, 3, 10);
    var armMesh = new THREE.Mesh(armGeometry, armMaterial);
    armMesh.position.set(x, 0, -5);
    
    return armMesh;
};


BallGuy.prototype.checkForCollision = function() {
    for (var i = 0; i < this.scene.drawables.length; ++i)
    {
        if (this.intersects(this.scene.drawables[i].boundingBox))
        {
            if (typeof(this.scene.drawables[i].threeJsDrawable.speed) !== 'undefined')
            {
                console.log("Colision");
                this.scene.drawables[i].navigationBoundingBox.xLeft += 5;
                this.scene.drawables[i].threeJsDrawable.position.x += 5;
                this.scene.drawables[i].boundingBox.position.xLeft += 5;
            }
        }
    }    
};
