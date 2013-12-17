/**
 * @author Christopher D. Canfield
 * GameScene.js
 * October 2013
 */


/**
 * The root node for the scene.
 */
function GameScene() {
    Drawable.call(this);
    
    this.threeJsScene = new THREE.Scene();
    this.zones = new Zones();
    
    this.doors = [];
}

GameScene.prototype = Object.create(Drawable.prototype);
GameScene.prototype.constructor = GameScene;

GameScene.prototype.superUpdate = GameScene.prototype.update;

GameScene.prototype.update = function(deltaTime) {
    for (var i = 0; i < this.zones.length; ++i)
    {
        this.zones[i].updateParticles(deltaTime);
    }
    
    this.superUpdate(deltaTime);
};

GameScene.prototype.createScene = function() {
    // Create the scene.
    StartRoom.create(this, this.zones);
    Outside.create(this, this.zones);
    
    // Attach the scene to the three.js scene graph.
    this.addToThreeJsScene(this.threeJsScene);
};


GameScene.prototype.getThreeJsScene = function() {
    return this.threeJsScene;    
};

GameScene.prototype.getZones = function() {
    return this.zones;    
};

GameScene.prototype.addDoor = function(door) {
    this.doors.push(door);    
};

GameScene.prototype.getDoors = function() {
    return this.doors;    
};
