/**
 * @author Christopher D. Canfield
 * Drawable.js
 * October 2013
 */


function Drawable() {
    this.geometry = new THREE.Geometry();
    
    // The object that will be added to the three.js scene.
    this.threeJsDrawable = null;
    
    // Drawables that make up this object. 
    // They are drawn when this object is drawn.
    this.drawables = [];
    
    // The drawable's bounding box. The object is not required
    // to have a bounding box. Type: BoundingBox.
    // Remember: If this is set, this must also be moved when the object is moved.
    this.boundingBox = null;
    
    // The area that the drawable blocks. The object is not required
    // to block an area. Type: BlockedArea.
    // Remember: If this is set, this must also be moved when the object is moved.
    this.blockedArea = null;
    
    // Reference to the nav graph that the drawable will use.
    this.navGraph = null;
    this.currentNavTarget = null;
    this.navigationBoundingBox = null;
    this.lastNavTargetId = -1;
    
    // The x & z movement and y rotation that is applied per call of 
    // the update method.
    this.movementX = 0.0;
    this.movementZ = 0.0;
    this.rotationY = 0.0;
}

Drawable.prototype.isDrawable = function() {
    return true;    
};


/**
 * Attaches a Drawable to this scene object.
 * @param {Drawable} drawable the Drawable to add to this scene object.
 */
Drawable.prototype.add = function(drawable) {
    if (typeof drawable.isDrawable !== "undefined")
    {
        this.drawables.push(drawable);
    }
};


/**
 * Adds this object to the three.js scene graph.
 * @param {THREE.Scene} threeJsScene reference to the three.js scene.
 */
Drawable.prototype.addToThreeJsScene = function(threeJsScene) {
    if (this.threeJsDrawable !== null)
    {
        threeJsScene.add(this.threeJsDrawable);
    }
    
    for (var i = 0; i < this.drawables.length; ++i)
    {
        this.drawables[i].addToThreeJsScene(threeJsScene);        
    }    
};



/**
 *Calls the update and updateThis methods on all attached drawables. 
 */
Drawable.prototype.update = function(deltaTime) {
    for (var i = 0; i < this.drawables.length; ++i)
    {
        this.drawables[i].updateThis(deltaTime);
        this.drawables[i].update(deltaTime);        
    }    
};

Drawable.prototype.updateThis = function(deltaTime) {
    // Override in inheriting class if this functionality is needed.
};


/**
 * 
 * @param {BoundingBox} otherBox
 * @return boolean identifying if the two bounding boxes intersect.
 */
Drawable.prototype.intersects = function(otherBox) {
    if (this.boundingBox == null || otherBox == null)
    {
        return false;
    }
    else
    {
        return this.boundingBox.intersects(otherBox);
    }
};


// TODO (11/13/2013): These should not be members of drawable.

Drawable.prototype.setRandomNavPointTarget = function() {
    if (this.navGraph == null)
    {
        throw "navGraph is null. Exception thrown from Drawable.prototype.getNavPoint";
    }
    
    var rand = -1;
    var continueLooping = true;
    // Don't backtrack.
    while (continueLooping)
    {
        rand = Math.floor((Math.random() * 100) % this.currentNavTarget.next.length);
        continueLooping = (this.currentNavTarget.next[rand].id === this.lastNavTargetId);
    }
    
    this.lastNavTargetId = this.currentNavTarget.id;
    this.currentNavTarget = this.currentNavTarget.next[rand];  
};

Drawable.prototype.isAtNavTarget = function() {
    var navTargetBox = new BoundingBox(this.currentNavTarget.x, 3, 100, 105, this.currentNavTarget.z, 3);
    return (this.navigationBoundingBox.intersects(navTargetBox));
};

Drawable.prototype.setMovement = function() {
    var angle = MathHelper.angleInRadians(this.currentNavTarget.x, this.currentNavTarget.z,
            this.threeJsDrawable.position.x, this.threeJsDrawable.position.z);
    
    this.movementX = Math.cos(angle);
    this.movementZ = Math.sin(angle);
    
    this.rotationY = angle;
};
