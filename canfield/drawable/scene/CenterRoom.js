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
    //this.zone = new Zone(new BoundingBox(Room1.X_LEFT, Room1.X_WIDTH, 
    //                    0, 1000, 
    //                    Room1.Z_BACK, Room1.Z_DEPTH));
    zones.add(this.zone);
    
    // TODO: change wall textures.
    
    // BuildingWall constructor parameters:
    // BuildingWall(xLeft: float, zBack: float, width: float, height: float, depth: 
         // float, texturePath: String, textureRepeatX: int, textureRepeatY: int, zone: 
         // Zone): BuildingWall
    
    // Back wall.
    // TODO: uncomment and update this.
    /*var backWall = new BuildingWall(Room1.X_LEFT, Room1.Z_BACK, 
            Room1.X_WIDTH, 200, 30,
            Textures.WALL_5, 14, 7,
            this.zone, true);
    gameScene.add(backWall); */
    
    // Front wall.
    // TODO: uncomment and update this.
    /*var frontWall = new BuildingWall(Room1.X_LEFT, Room1.Z_BACK + Room1.Z_DEPTH, 
            Room1.X_WIDTH, 200, 30,
            Textures.WALL_2, 10, 4,
            this.zone);
    gameScene.add(frontWall); */
    
    // East wall.
    
    
    // West wall.
    
    
    // TODO: add lights, door, models, particle systems.
};

// TODO: Update these values
CenterRoom.X_LEFT = -400;
CenterRoom.X_WIDTH = 800;
CenterRoom.Z_BACK = -150;
CenterRoom.Z_DEPTH = 1100;