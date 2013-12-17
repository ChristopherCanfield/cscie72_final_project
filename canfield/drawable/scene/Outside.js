/**
 * @author Christopher D. Canfield
 * Outside.js
 * December 2013
 */



function Outside() {}


/**
 * Creates the room that the player starts in.
 * @param {GameScene} gameScene 
 * @param {Zones} zones 
 */
Outside.create = function(gameScene, zones) {
    var zone = new Zone(new BoundingBox(Outside.X_LEFT - 30, Outside.X_WIDTH + 60, 
                        0, 1000, 
                        Outside.Z_BACK - 150, Outside.Z_DEPTH + 60));
    zones.add(zone);
    
    Outside.addLights(gameScene, zone);
    Outside.addWalls(gameScene, zone);
    Outside.addFloorCeiling(gameScene, zone);
    Outside.addParticleSystems(gameScene, zone);
    Outside.addObjects(gameScene, zone);
};

Outside.addWalls = function(gameScene, zone) {
    var wallHeight = 20;
    var wallTexture = Textures.CONCRETE_6;
    var wallTextureRepeatX = 30;
    var wallTextureRepeatY = 2;
    
    // Back wall.
    var backWall1 = new BuildingWall(Outside.X_LEFT, StartRoom.Y_BOTTOM, Outside.Z_BACK + 10, 
            Outside.X_WIDTH / 2 - 25, // Width
            wallHeight, // Height
            6, // Depth
            wallTexture, wallTextureRepeatX, wallTextureRepeatY,
            zone);
    gameScene.add(backWall1);
    
    var backWall2 = new BuildingWall(Outside.X_LEFT + Outside.X_WIDTH / 2 + 25, StartRoom.Y_BOTTOM, Outside.Z_BACK + 10, 
            Outside.X_WIDTH / 2 - 25, // Width
            wallHeight, // Height
            6, // Depth
            wallTexture, wallTextureRepeatX, wallTextureRepeatY,
            zone);
    gameScene.add(backWall2);
    
    // Front wall side.
    var frontWall = new BuildingWall(Outside.X_LEFT, StartRoom.Y_BOTTOM, Outside.Z_BACK + Outside.Z_DEPTH, 
            StartRoom.X_WIDTH, // Width
            wallHeight, // Height
            6, // Depth
            wallTexture, wallTextureRepeatX, wallTextureRepeatY,
            zone);
    gameScene.add(frontWall);
     
    // East wall.
    var eastWall = new BuildingWall(Outside.X_LEFT, StartRoom.Y_BOTTOM, Outside.Z_BACK + Outside.Z_DEPTH, 
            6, // Width
            wallHeight, // Height
            Outside.Z_DEPTH + Outside.Z_BACK, // Depth
            wallTexture, wallTextureRepeatX, wallTextureRepeatY,
            zone);
    gameScene.add(eastWall);
    
    // West wall.
    var westWall = new BuildingWall(Outside.X_LEFT + Outside.X_WIDTH + 6, StartRoom.Y_BOTTOM, Outside.Z_BACK + Outside.Z_DEPTH, 
            6, // Width
            wallHeight, // Height
            Outside.Z_DEPTH + Outside.Z_BACK, // Depth
            wallTexture, wallTextureRepeatX, wallTextureRepeatY,
            zone);
    gameScene.add(westWall);
};

Outside.addFloorCeiling = function(gameScene, zone) {
    // Ground.
    gameScene.add(new FloorCeiling(Outside.X_LEFT + Outside.X_WIDTH * 2, StartRoom.Y_BOTTOM - 1, Outside.Z_BACK + Outside.Z_DEPTH, 
            Outside.X_WIDTH * 4, 1, Outside.Z_DEPTH, 
            Textures.GROUND_GRASS_MUD, 12, 12));
};

Outside.addLights = function(gameScene, zone) {
    var lampColor = 0x21B2FF;
    
    var nearDoor1 = new FloorLamp(Outside.X_LEFT + Outside.X_WIDTH / 2 - 200, 0, Outside.Z_BACK + 225, zone, gameScene, lampColor, 2, 300);
    gameScene.add(nearDoor1);
    
    var nearDoor2 = new FloorLamp(Outside.X_LEFT + Outside.X_WIDTH / 2 + 200, 0, Outside.Z_BACK + 225, zone, gameScene, lampColor, 2, 300);
    gameScene.add(nearDoor2);
    
    var middle1 = new FloorLamp(Outside.X_LEFT + Outside.X_WIDTH / 2 - 200, 0, Outside.Z_BACK + 650, zone, gameScene, lampColor, 2, 550);
    gameScene.add(middle1);
    
    var middle2 = new FloorLamp(Outside.X_LEFT + Outside.X_WIDTH / 2 + 200, 0, Outside.Z_BACK + 650, zone, gameScene, lampColor, 2, 550);
    gameScene.add(middle2);
    
    var farLeft = new FloorLamp(Outside.X_LEFT + Outside.X_WIDTH + 375, 0, Outside.Z_BACK + 475, zone, gameScene, lampColor, 2, 550);
    gameScene.add(farLeft);
    
    var farRight = new FloorLamp(Outside.X_LEFT + Outside.X_WIDTH / 2 - 375, 0, Outside.Z_BACK + 475, zone, gameScene, lampColor, 2, 550);
    gameScene.add(farRight);
    
    var back = new FloorLamp(Outside.X_LEFT + Outside.X_WIDTH / 2 - 25, 0, Outside.Z_BACK + 1250, zone, gameScene, lampColor, 2, 450);
    gameScene.add(back);
    
    var bigCenter = new FloorLamp(Outside.X_LEFT + Outside.X_WIDTH / 2, 0, Outside.Z_BACK + 750, zone, gameScene, 0xFFD846, 3, 650, true);
    bigCenter.threeJsDrawable.scale.set(4, 4, 4);
    gameScene.add(bigCenter);
    
    // var farRight = new FloorLamp(Outside.X_LEFT + Outside.X_WIDTH, 0, Outside.Z_BACK + 400, zone, gameScene, lampColor, 2.5);
    // gameScene.add(farLeft);
};

Outside.addParticleSystems = function(gameScene, zone) {
    // Create prototypical particle
    var position1 = new THREE.Vector3(Outside.X_LEFT + Outside.X_WIDTH / 2, 100, Outside.Z_BACK + 500);
    var speed1 = new THREE.Vector3(0.1, 6, 0.1);
    var direction1 = new THREE.Vector3(1, -1, 1);
    var size1 = 0.18;
    var color1 = new THREE.Color("rgb(255, 255, 255)");
    var lifetime1 = 6000;
    var protoParticle = new Particle(null, position1, speed1, direction1, 
          size1, color1, lifetime1);
    var particleSpreadVector = new THREE.Vector3(500, 10, 500);      
    
    var continuousSystem = new ContinuousParticleSystem(zone, gameScene.getThreeJsScene(), 
            20, 1000, protoParticle, particleSpreadVector, 300);
   zone.addParticleSystem(continuousSystem);
};

Outside.addObjects = function(gameScene, zone) {
    // x, z, height, barkTexturePath, 
        // leavesRadius, leavesTexturePath, leavesTextureRepeat, zone
};




// TODO: Update these values
Outside.X_LEFT = StartRoom.X_LEFT;
Outside.X_WIDTH = StartRoom.X_WIDTH;
Outside.Z_BACK = StartRoom.Z_BACK + StartRoom.Z_DEPTH;
Outside.Z_DEPTH = 1500;