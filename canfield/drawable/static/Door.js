/**
 * @author Christopher D. Canfield
 * Door.js
 * December 2013
 */



/**
 * Creates an openable door.
 * @param {float} xLeft
 * @param {float} yBottom
 * @param {float} zBack
 * @param {float} width
 * @param {float} height
 * @param {float} depth
 * @param {Zone} zone The zone that the wall falls within.
 * @param {GameScene} gameScene Reference to the game scene.
 */
function Door(xLeft, yBottom, zBack, width, height, depth, zone, gameScene) {
    Drawable.call(this);
    zone.addDrawable(this);
    
    var texture = cdc.textureManager.getTexture(Textures.DOOR_1);
    texture.needsUpdate = true;
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    texture.repeat.set(1, 1);
    
    this.geometry = new THREE.CubeGeometry(width, height, depth);
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(xLeft + (width / 2), yBottom + (height / 2) - 0.5, zBack - (depth / 2));
    this.threeJsDrawable = mesh;
    
    // Prevent camera from walking through wall.
    this.boundingBox = new BoundingBox(xLeft, width, yBottom, height, zBack - depth, depth);
    this.blockedArea = new BlockedArea(this.boundingBox);
    zone.addBlockedArea(this.blockedArea);

    // The next four properties are related to the opening mechanism.
    // Specifies whether the door is currently opening.
    this.opening = false;
    // Whether the door is open.
    this.doorOpen = false;
    // The number of milliseconds to open the door, once it begins opening.
    this.timeToOpenMillis = 4000;
    // The movement speed of the door open animation.
    this.openSpeedPerMilli = width / this.timeToOpenMillis;
    
    this.zone = zone;
    gameScene.addDoor(this);
}


Door.prototype = Object.create(Drawable.prototype);
Door.prototype.constructor = Door;


/**
 * Returns true if the door is open, or false otherwise. 
 */
Door.prototype.isOpen = function() {
    return this.doorOpen;
};

/**
 * Opens the door, if it is not already open. 
 */
Door.prototype.open = function() {
    if (!this.opening && !this.doorOpen)
    {
        this.opening = true;
        this.timeSinceOpeningStarted = 0;
    }
};

// Inherited from Drawable.
Door.prototype.updateThis = function(deltaTime) {
    if (this.opening)
    {
        if (this.timeSinceOpeningStarted > this.timeToOpenMillis)
        {
            this.opening = false;
            this.doorOpen = true;
            // Once the door is open, remove the blocked area from the zone so the 
            // player can walk through it.
            this.zone.removeBlockedArea(this.blockedArea);
        }
        
        var deltaTimeMillis = deltaTime * 1000;
        this.timeSinceOpeningStarted += deltaTimeMillis;
        this.threeJsDrawable.position.x -= this.openSpeedPerMilli * deltaTimeMillis;
    }    
};
