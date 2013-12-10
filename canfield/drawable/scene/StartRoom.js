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
    var zone = new Zone(new BoundingBox(StartRoom.X_LEFT, StartRoom.X_WIDTH, 
                        0, 1000, 
                        StartRoom.Z_BACK, StartRoom.Z_DEPTH));
    zones.add(zone);
    
    StartRoom.addWallsFloorsCeiling(gameScene, zone);
    StartRoom.addParticleSystems(gameScene, zone);
    StartRoom.addLights(gameScene);
    StartRoom.addInsideObjects(gameScene, zone);
    StartRoom.addOutsideObjects(gameScene, zone);
};

StartRoom.addWallsFloorsCeiling = function(gameScene, zone) {
    // BuildingWall constructor parameters:
    // BuildingWall(xLeft: float, zBack: float, width: float, height: float, depth: 
         // float, texturePath: String, textureRepeatX: int, textureRepeatY: int, zone: 
         // Zone): BuildingWall
    
    // TODO: change wall textures.
    
    // Back wall.
    var backWall = new BuildingWall(StartRoom.X_LEFT, StartRoom.Z_BACK, 
            StartRoom.X_WIDTH, 200, 30,
            Textures.WALL_5, 14, 7,
            zone, true);
    gameScene.add(backWall);
    
    // Front wall.
    var frontWall = new BuildingWall(StartRoom.X_LEFT, StartRoom.Z_BACK + StartRoom.Z_DEPTH, 
            StartRoom.X_WIDTH, 200, 30,
            Textures.WALL_5, 14, 7,
            zone);
    gameScene.add(frontWall);
    
    // East wall.
    
    
    // West wall.
};

StartRoom.addLights = function(gameScene) {
    var light1 = new THREE.PointLight(0xFFFFFF, 10, 500); 
    light1.position.set(200, 30, 200); 
    gameScene.getThreeJsScene().add(light1);
};

StartRoom.addParticleSystems = function(gameScene, zone) {
    // TODO: complete this.
};

StartRoom.addOutsideObjects = function(gameScene, zone) {
    // TODO: complete this.
};

StartRoom.addInsideObjects = function(gameScene, zone) {
    // TODO: complete this.
};

StartRoom.X_LEFT = -400;
StartRoom.X_WIDTH = 800;
StartRoom.Z_BACK = -150;
StartRoom.Z_DEPTH = 1100;