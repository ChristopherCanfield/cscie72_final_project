/**
 * @author Christopher D. Canfield
 * BallGuy.js
 */


function BallChild(ballGuy, x, z) {
    Drawable.call(this);
    
    this.ballGuy = ballGuy;
    this.scene = ballGuy.scene;
    
    this.wrapper = new THREE.Object3D();
    this.wrapper.position.x = x;
    this.wrapper.position.z = z;
    this.wrapper.position.y = 8;
    
    this.speed = this.getRandomSpeed();
    
    /////// Create ball. ////////
    var ballTexture = cdc.textureManager.getTexture(Textures.TREAD_STEEL);
    var ballMaterial = new THREE.MeshLambertMaterial({ 
        map: ballTexture
    });
    ballTexture.repeat.set(2, 2);
    
    var ballGeometry = new THREE.SphereGeometry(8, 15, 15, 0, Math.PI * 2, 0, Math.PI);
    this.ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    this.ballMesh.position.set(0, 0, 0);
    
    ///////// Create body. /////////
    var bodyTexture = cdc.textureManager.getTexture(Textures.METAL_2);
    var bodyMaterial = new THREE.MeshPhongMaterial({ 
        map: bodyTexture,
        shininess: 80
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
    this.maxArmSwitchTime = Math.random() + 0.25;
    
    // Add to scene.
    this.threeJsSceneObject = this.wrapper;
    this.wrapper.add(this.bodyMesh);
    
    this.bodyMesh.add(eye1Mesh);
    this.bodyMesh.add(eye2Mesh);

    this.bodyMesh.add(this.upperArm1);
    this.upperArm1.add(this.lowerArm1);

    this.bodyMesh.add(this.upperArm2);
    this.upperArm2.add(this.lowerArm2);
    
    this.wrapper.add(this.ballMesh);
    this.wrapper.scale = new THREE.Vector3(0.35, 0.35, 0.35);
    
    // Add bounding box.
    this.boundingBox = new BoundingBox(this.wrapper.position.x, 20, 20, 25, this.wrapper.position.z, 20);
    console.log("Bounding Box: " + this.wrapper.position.x + ", " + this.wrapper.position.z);
    
    // Set the navigation target.
    this.navGraph = ballGuy.navGraph;
    this.lastNavTargetId = ballGuy.lastNavPointId;
    this.currentNavTarget = ballGuy.currentNavTarget;
    this.setMovement();
    this.navigationBoundingBox = new BoundingBox(this.wrapper.position.x, 5,
            0, 10, this.wrapper.position.z, 5);
            
    var lookAtVector = new THREE.Vector3(ballGuy.threeJsSceneObject.position.x, 10, ballGuy.threeJsSceneObject.position.z);
    this.wrapper.lookAt(lookAtVector);
}

BallChild.prototype = Object.create(Drawable.prototype);
BallChild.prototype.constructor = BallChild;


BallChild.prototype.animate = function(deltaTime) {
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
    if (this.timeSinceArmSwitch > this.maxArmSwitchTime)
    {
        this.armModifier *= -1.0;
        this.timeSinceArmSwitch = 0;
        this.maxArmSwitchTime = Math.random() + 0.25;
    }
    
    this.upperArm1.rotation.x -= (0.015 * this.armModifier);
    this.upperArm2.rotation.x += (0.025 * this.armModifier);
    
    // Update the BallChild's movement.
    this.wrapper.position.x += this.movementX * this.speed;
    this.navigationBoundingBox.xLeft += this.movementX * this.speed; 
    this.boundingBox.xLeft += this.movementX * this.speed;
    
    this.wrapper.position.z += this.movementZ * this.speed;
    this.navigationBoundingBox.zFront += this.movementZ * this.speed;
    this.boundingBox.zFront += this.movementZ * this.speed;
    
    // Check to see if the BallChild is at the navigation target, and if it is, 
    // pick a new target.
    if (this.isAtNavTarget())
    {
        this.lastNavTargetId = this.ballGuy.lastNavTargetId;
        this.currentNavTarget = this.ballGuy.currentNavTarget;
        this.setMovement();
        
        var lookAtVector = new THREE.Vector3(this.currentNavTarget.x, 0, this.currentNavTarget.z);
        this.wrapper.lookAt(lookAtVector);
        
        this.speed = this.getRandomSpeed();
    }
    
    this.checkForCollision();
};


BallChild.prototype.createUpperArm = function(x) {
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

BallChild.prototype.createLowerArm = function(x) {
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


BallChild.prototype.checkForCollision = function() {
    for (var i = 0; i < this.scene.drawables.length; ++i)
    {
        if (this.intersects(this.scene.drawables[i].boundingBox))
        {
            
            if (typeof(this.scene.drawables[i].threeJsSceneObject) === 'BallChild')
            {
                console.log("Collision child");
                this.scene.drawables[i].navigationBoundingBox.xLeft += 5;
                this.scene.drawables[i].threeJsSceneObject.position.x += 5;
                this.scene.drawables[i].boundingBox.xLeft += 5;
            }
        }
    }    
};

BallChild.prototype.getRandomSpeed = function() {
    return 0.25;
    // var rand = Math.round(Math.random() * 100) % 8;
    // if (rand == 0)
    // {
        // return 0.2;
    // }   
    // return (0.05 * rand);
};
