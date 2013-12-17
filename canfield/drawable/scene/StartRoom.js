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
    // Add three windows.
    backWall.threeJsDrawable.add(new WindowFancy(-200, 0, 17, true));
    backWall.threeJsDrawable.add(new WindowFancy(+200, 0, 17, true));
    backWall.threeJsDrawable.add(new WindowFancy(0, 0, 17, true));
    
    // Front wall side 1.
    var frontWall1 = new BuildingWall(StartRoom.X_LEFT, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH, 
            StartRoom.X_WIDTH / 2 - 25, // Width
            StartRoom.Y_HEIGHT, // Height
            10, // Depth
            Textures.WALL_5, 
            20, 5,
            zone);
    gameScene.add(frontWall1);
    
    // Front wall side 2.
    var frontWall2 = new BuildingWall(StartRoom.X_LEFT + StartRoom.X_WIDTH / 2 + 25, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH, 
            StartRoom.X_WIDTH, // Width
            StartRoom.Y_HEIGHT, // Height
            10, // Depth
            Textures.WALL_5, 
            20, 5,
            zone);
    gameScene.add(frontWall2);
    
    // Front door.
    var door = new Door(StartRoom.X_LEFT + StartRoom.X_WIDTH / 2 - 25, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH - 5,
            50, // Width
            StartRoom.Y_HEIGHT, // Height
            10, // Depth
            zone,
            gameScene);
   gameScene.add(door);
    
    // East wall.
    var eastWall = new BuildingWall(StartRoom.X_LEFT, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH, 
            30, // Width
            StartRoom.Y_HEIGHT, // Height
            StartRoom.Z_DEPTH + StartRoom.Z_BACK + 150, // Depth
            Textures.WALL_5, 20, 5,
            zone);
    gameScene.add(eastWall);
    // Add two windows.
    eastWall.threeJsDrawable.add(new WindowFancy(17, 0, 215, false));
    eastWall.threeJsDrawable.add(new WindowFancy(17, 0, -215, false));
    // Add wall drapes.
    eastWall.threeJsDrawable.add(new WallDrape(17, 0, 0, false));
    eastWall.threeJsDrawable.add(new WallDrape(17, 0, 15, false));
    eastWall.threeJsDrawable.add(new WallDrape(17, 0, -15, false));
    eastWall.threeJsDrawable.add(new WallDrape(17, 0, 40, false));
    eastWall.threeJsDrawable.add(new WallDrape(17, 0, -40, false));
    
    // West wall.
    var westWall = new BuildingWall(StartRoom.X_LEFT + StartRoom.X_WIDTH, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH, 
            30, // Width
            StartRoom.Y_HEIGHT, // Height
            StartRoom.Z_DEPTH + StartRoom.Z_BACK + 150, // Depth
            Textures.WALL_5, 20, 5,
            zone);
    gameScene.add(westWall);
    // Add two windows.
    westWall.threeJsDrawable.add(new WindowFancy(-17, 0, 215, false));
    westWall.threeJsDrawable.add(new WindowFancy(-17, 0, -215, false));
    // Add wall drapes.
    westWall.threeJsDrawable.add(new WallDrape(-17, 0, 0, false, WallDrapeColor.RED));
    westWall.threeJsDrawable.add(new WallDrape(-17, 0, 15, false, WallDrapeColor.RED));
    westWall.threeJsDrawable.add(new WallDrape(-17, 0, -15, false, WallDrapeColor.RED));
    westWall.threeJsDrawable.add(new WallDrape(-17, 0, 40, false, WallDrapeColor.RED));
    westWall.threeJsDrawable.add(new WallDrape(-17, 0, -40, false, WallDrapeColor.RED));
};

StartRoom.addFloorCeiling = function(gameScene, zone) {
    // Floor.
    gameScene.add(new FloorCeiling(StartRoom.X_LEFT + StartRoom.X_WIDTH, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH, 
            StartRoom.X_WIDTH, 1, StartRoom.Z_DEPTH, 
            Textures.WOODBOARD_1, 6, 6));
            
    // Ceiling.
    gameScene.add(new FloorCeiling(StartRoom.X_LEFT + StartRoom.X_WIDTH, StartRoom.Y_BOTTOM + StartRoom.Y_HEIGHT, StartRoom.Z_BACK + StartRoom.Z_DEPTH, 
            StartRoom.X_WIDTH, 1, StartRoom.Z_DEPTH, 
            Textures.CONCRETE_7, 8, 8));
};

StartRoom.addLights = function(gameScene) {
    var light1 = new THREE.PointLight(0xE5E5CD, 3, 1000);
    light1.rotation.x = Math.PI / 4;
    light1.position.set(StartRoom.X_LEFT + 300, 50, StartRoom.Z_BACK + 400); 
    var scene = gameScene.getThreeJsScene();
    //scene.add(light1);
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
    // var explosionPosition = new THREE.Vector3(StartRoom.X_LEFT + 375, 30, StartRoom.Z_BACK + 400);
    // var explosionSpeed = new THREE.Vector3(13.5, 9.5, 13.5);
    // var particleSize = 0.4;
    // var explosionSystem = new ExplosionParticleSystem(zone, gameScene.getThreeJsScene(), 
                    // 1750, 500, explosionPosition, explosionSpeed, particleSize,
                    // new THREE.Color("rgb(244,93,70)"), 2500, ParticleSpread.SMALL);
    // zone.addParticleSystem(explosionSystem);
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