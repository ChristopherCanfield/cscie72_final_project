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

    this.opening = false;
    this.open = false;
    this.timeToOpenMillis = 2000;
    this.openSpeedPerMilli = width / this.timeToOpenMillis;
    
    gameScene.addDoor(this);
}


Door.prototype = Object.create(Drawable.prototype);
Door.prototype.constructor = Door;


Door.prototype.isOpen = function() {
    return this.open;
};

Door.prototype.open = function() {
    if (!this.opening && !this.open)
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
            this.open = true;
        }
        
        this.timeSinceOpeningStarted += (deltaTime * 1000);
        this.threeJsDrawable.position.x -= openSpeedPerMilli;
    }    
};
