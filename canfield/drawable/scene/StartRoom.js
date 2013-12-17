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
    
    StartRoom.addLights(gameScene, zone);
    StartRoom.addWalls(gameScene, zone);
    StartRoom.addFloorCeiling(gameScene, zone);
    StartRoom.addParticleSystems(gameScene, zone);
    StartRoom.addObjects(gameScene, zone);
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
            10, 5,
            zone);
    gameScene.add(frontWall1);
    frontWall1.threeJsDrawable.add(new WallDrape(155, 0, -7, true, WallDrapeColor.GOLDLEAF));
    
    // Front wall side 2.
    var frontWall2 = new BuildingWall(StartRoom.X_LEFT + StartRoom.X_WIDTH / 2 + 25, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH, 
            StartRoom.X_WIDTH / 2 - 25, // Width
            StartRoom.Y_HEIGHT, // Height
            10, // Depth
            Textures.WALL_5, 
            10, 5,
            zone);
    gameScene.add(frontWall2);
    frontWall2.threeJsDrawable.add(new WallDrape(-155, 0, -7, true, WallDrapeColor.GOLDLEAF));
    
    // Front door.
    var door = new Door(StartRoom.X_LEFT + StartRoom.X_WIDTH / 2 - 25, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH,
            50, // Width
            StartRoom.Y_HEIGHT, // Height
            10, // Depth
            zone,
            gameScene);
   gameScene.add(door);
    
    // East wall.
    var eastWall = new BuildingWall(StartRoom.X_LEFT, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH - 5, 
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
    var westWall = new BuildingWall(StartRoom.X_LEFT + StartRoom.X_WIDTH, StartRoom.Y_BOTTOM, StartRoom.Z_BACK + StartRoom.Z_DEPTH - 5, 
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

StartRoom.addLights = function(gameScene, zone) {  
    var frontLeft = new FloorLamp(125, 0, StartRoom.Z_BACK + StartRoom.Z_DEPTH - 75, zone, gameScene);
    gameScene.add(frontLeft);
    var frontRight = new FloorLamp(-125, 0, StartRoom.Z_BACK + StartRoom.Z_DEPTH - 75, zone, gameScene);
    gameScene.add(frontRight);
    
    var backLeft = new FloorLamp(200, 0, StartRoom.Z_BACK + 100, zone, gameScene);
    gameScene.add(backLeft);
    var backRight = new FloorLamp(-200, 0, StartRoom.Z_BACK + 100, zone, gameScene);
    gameScene.add(backRight);
    
    var right = new FloorLamp(StartRoom.X_LEFT + 100, 0, StartRoom.Z_BACK + StartRoom.Z_DEPTH / 2, zone, gameScene);
    gameScene.add(right);
    var left = new FloorLamp(StartRoom.X_LEFT + StartRoom.X_WIDTH - 100, 0, StartRoom.Z_BACK + StartRoom.Z_DEPTH / 2, zone, gameScene);
    gameScene.add(left);
};

StartRoom.addParticleSystems = function(gameScene, zone) {
};

StartRoom.addObjects = function(gameScene, zone) {
};


StartRoom.X_LEFT = -400;
StartRoom.X_WIDTH = 800;
StartRoom.Y_BOTTOM = 0;
StartRoom.Y_HEIGHT = 80;
StartRoom.Z_BACK = -150;
StartRoom.Z_DEPTH = 800;