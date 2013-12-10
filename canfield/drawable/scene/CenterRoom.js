/**
 * @author Christopher D. Canfield
 * StartRoom.js
 * December 2013
 */



function CenterRoom() {}


/**
 * Creates the room that the player starts in.
 * @param {GameScene} gameScene 
 * @param {Zones} zones 
 */
CenterRoom.create = function(gameScene, zones) {
    // TODO: uncomment and update this.
    //var.zone = new Zone(new BoundingBox(Room1.X_LEFT, Room1.X_WIDTH, 
    //                    0, 1000, 
    //                    Room1.Z_BACK, Room1.Z_DEPTH));
    zones.add(zone);
    
    CenterRoom.addWallsFloorsCeiling(gameScene, zone);
    CenterRoom.addParticleSystems(gameScene, zone);
    CenterRoom.addLights(gameScene);
    CenterRoom.addInsideObjects(gameScene, zone);
    CenterRoom.addOutsideObjects(gameScene, zone);
};

CenterRoom.addWallsFloorsCeiling = function(gameScene, zone) {
    // BuildingWall constructor parameters:
    // BuildingWall(xLeft: float, zBack: float, width: float, height: float, depth: 
         // float, texturePath: String, textureRepeatX: int, textureRepeatY: int, zone: 
         // Zone): BuildingWall
    
    // TODO: change wall textures.
    // TODO: change this to the correct layout.
    
    // Back wall.
    var backWall = new BuildingWall(CenterRoom.X_LEFT, CenterRoom.Z_BACK, 
            CenterRoom.X_WIDTH, 200, 30,
            Textures.WALL_5, 14, 7,
            zone, true);
    gameScene.add(backWall);
    
    // Front wall.
    var frontWall = new BuildingWall(CenterRoom.X_LEFT, CenterRoom.Z_BACK + CenterRoom.Z_DEPTH, 
            CenterRoom.X_WIDTH, 200, 30,
            Textures.WALL_2, 10, 4,
            zone);
    gameScene.add(frontWall);
    
    // East wall.
    
    
    // West wall.
};

CenterRoom.addLights = function(gameScene) {
    // TODO: update and add to this.
    var light1 = new THREE.PointLight(0xFFFFFF, 15, 300); 
    light1.position.set(200, 20, -100); 
    gameScene.add(light1);    
};

CenterRoom.addParticleSystems = function(gameScene, zone) {
    // TODO: complete this.
};

CenterRoom.addOutsideObjects = function(gameScene, zone) {
    // TODO: complete this.
};

CenterRoom.addInsideObjects = function(gameScene, zone) {
    // TODO: complete this.
};




// TODO: Update these values
CenterRoom.X_LEFT = -400;
CenterRoom.X_WIDTH = 800;
CenterRoom.Z_BACK = -150;
CenterRoom.Z_DEPTH = 1100;