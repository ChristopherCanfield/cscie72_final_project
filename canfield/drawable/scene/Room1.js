/**
 * @author Christopher D. Canfield
 * Room1.js
 * December 2013
 */



/**
 * Creates the room that the player starts in.
 * @param {GameScene} gameScene 
 * @param {Zones} zones 
 */
function Room1(gameScene, zones) {
    this.zone = new Zone(new BoundingBox(Room1.X_LEFT, Room1.X_WIDTH, 
                        1000, 1000, 
                        Room1.Z_BACK + Room1.Z_DEPTH, Room1.Z_DEPTH));
    zones.add(this.zone);
    
    // TODO: change wall textures.
    
    // BuildingWall constructor parameters:
    // BuildingWall(xLeft: float, zBack: float, width: float, height: float, depth: 
         // float, texturePath: String, textureRepeatX: int, textureRepeatY: int, zone: 
         // Zone): BuildingWall
    
    // Back wall.
    var backWall = new BuildingWall(Room1.X_LEFT, Room1.Z_BACK, 
            Room1.X_WIDTH, 200, 50,
            Textures.METAL_1, 10, 2,
            this.zone);
    gameScene.add(backWall);
    
    // Front wall.
    var frontWall = new BuildingWall(Room1.X_LEFT, Room1.Z_BACK + Room1.Z_DEPTH, 
            Room1.X_WIDTH, 200, 50,
            Textures.METAL_1, 10, 2,
            this.zone);
    gameScene.add(backWall);
    
    // East wall.
    
    
    // West wall.
    
    
    // TODO: add lights, door, models.
}

Room1.X_LEFT = -400;
Room1.X_WIDTH = 800;
Room1.Z_BACK = -150;
Room1.Z_DEPTH = 1100;