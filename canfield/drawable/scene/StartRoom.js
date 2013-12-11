/**
 * @author Christopher D. Canfield
 * StartRoom.js
 * December 2013
 */



function StartRoom() {}


/**
 * Creates the room that the player starts in.
 * @param {GameScene} gameScene 
 * @param {Zones} zones 
 */
StartRoom.create = function(gameScene, zones) {
    var zone = new Zone(new BoundingBox(StartRoom.X_LEFT - 30, StartRoom.X_WIDTH + 60, 
                        0, 1000, 
                        StartRoom.Z_BACK - 30, StartRoom.Z_DEPTH + 60));
    zones.add(zone);
    
    StartRoom.addWalls(gameScene, zone);
    StartRoom.addFloorCeiling(gameScene, zone);
    StartRoom.addParticleSystems(gameScene, zone);
    StartRoom.addLights(gameScene);
    StartRoom.addInsideObjects(gameScene, zone);
    StartRoom.addOutsideObjects(gameScene, zone);
};

StartRoom.addWalls = function(gameScene, zone) {
    // BuildingWall constructor parameters:
        // BuildingWall(xLeft: float, zBack: float, 
        // width: float, height: float, depth: float, 
        // texturePath: String, textureRepeatX: int, textureRepeatY: int, zone: Zone): BuildingWall
    
    // Back wall.
    var backWall = new BuildingWall(StartRoom.X_LEFT, StartRoom.Y_BOTTOM, StartRoom.Z_BACK, 
            StartRoom.X_WIDTH, StartRoom.Y_HEIGHT, 30,
            Textures.WALL_5, 20, 5,
            zone);
    gameScene.add(backWall);
    
    // Front wall.
    var frontWall = new BuildingWall(StartRoom.X_LEFT, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH, 
            StartRoom.X_WIDTH, // Width
            StartRoom.Y_HEIGHT, // Height
            30, // Depth
            Textures.WALL_5, 
            20, 5,
            zone);
    gameScene.add(frontWall);
    
    // East wall.
    var eastWall = new BuildingWall(StartRoom.X_LEFT, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH, 
            30, // Width
            StartRoom.Y_HEIGHT, // Height
            StartRoom.Z_DEPTH + StartRoom.Z_BACK + 150, // Depth
            Textures.WALL_5, 20, 5,
            zone);
    gameScene.add(eastWall);
    
    // West wall.
    var westWall = new BuildingWall(StartRoom.X_LEFT + StartRoom.X_WIDTH, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH, 
            30, // Width
            StartRoom.Y_HEIGHT, // Height
            StartRoom.Z_DEPTH + StartRoom.Z_BACK + 150, // Depth
            Textures.WALL_5, 20, 5,
            zone);
    gameScene.add(westWall);
};

StartRoom.addFloorCeiling = function(gameScene, zone) {
    
};

StartRoom.addLights = function(gameScene) {
    var light1 = new THREE.PointLight(0xFFF42B, 10, 500); 
    light1.position.set(StartRoom.X_LEFT + 300, 40, StartRoom.Z_BACK + 400); 
    gameScene.getThreeJsScene().add(light1);
};

StartRoom.addParticleSystems = function(gameScene, zone) {
    // TODO: complete this.
    
    // Create prototypical particle
    var position1 = new THREE.Vector3(StartRoom.X_LEFT + 300, 40, StartRoom.Z_BACK + 400);
    var speed1 = new THREE.Vector3(0, 6, 0);
    var direction1 = new THREE.Vector3(0, -1, 0);
    var size1 = 0.18;
    var color1 = new THREE.Color("rgb(76, 255,0)");
    var lifetime1 = 3000;
    var protoParticle = new Particle(null, position1, speed1, direction1, 
          size1, color1, lifetime1);
    
  //   var continuousSystem = new ContinuousParticleSystem(zone, gameScene.getThreeJsScene(), 
   //          80, 500, protoParticle, ParticleSpread.MEDIUM);
   // zone.addParticleSystem(continuousSystem);
    
    // Add explosion.
    var explosionPosition = new THREE.Vector3(StartRoom.X_LEFT + 375, 30, StartRoom.Z_BACK + 400);
    var explosionSpeed = new THREE.Vector3(13.5, 9.5, 13.5);
    var particleSize = 0.4;
    var explosionSystem = new ExplosionParticleSystem(zone, gameScene.getThreeJsScene(), 
                    1750, 500, explosionPosition, explosionSpeed, particleSize,
                    new THREE.Color("rgb(244,93,70)"), 2500, ParticleSpread.SMALL);
    zone.addParticleSystem(explosionSystem);
};

StartRoom.addOutsideObjects = function(gameScene, zone) {
    // TODO: complete this.
};

StartRoom.addInsideObjects = function(gameScene, zone) {
    // TODO: complete this.
};

StartRoom.X_LEFT = -400;
StartRoom.X_WIDTH = 800;
StartRoom.Y_BOTTOM = 0;
StartRoom.Y_HEIGHT = 80;
StartRoom.Z_BACK = -150;
StartRoom.Z_DEPTH = 800;