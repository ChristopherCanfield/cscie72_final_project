/**
 * @author Christopher D. Canfield
 * Drawable.js
 * October 2013
 */


function Drawable() {
    this.geometry = new THREE.Geometry();
    
    // The object that will be added to the three.js scene.
    this.threeJsSceneObject = null;
    
    // Drawables that make up this object. 
    // They are drawn when this object is drawn.
    this.drawables = [];
    
    this.boundingBox = null;
    
    this.navGraph = null;
    this.currentNavTarget = null;
    this.navigationBoundingBox = null;
    this.lastNavTargetId = -1;
    
    this.movementX = 0.0;
    this.movementZ = 0.0;
    this.rotationY = 0.0;
};


/**
 * Attaches a Drawable to this scene object.
 * @param {Drawable} drawable the Drawable to add to this scene object.
 */
Drawable.prototype.add = function(drawable) {
    this.drawables.push(drawable);
};


/**
 * Adds this object to the three.js scene graph.
 * @param {THREE.Scene} threeJsScene the three.js scene object.
 */
Drawable.prototype.addToThreeJsScene = function(threeJsScene) {
    if (this.threeJsSceneObject != null)
    {
        threeJsScene.add(this.threeJsSceneObject);
    }
    
    for (var i = 0; i < this.drawables.length; ++i)
    {
        this.drawables[i].addToThreeJsScene(threeJsScene);        
    }    
};



Drawable.prototype.update = function(deltaTime) {
    for (var i = 0; i < this.drawables.length; ++i)
    {
        this.drawables[i].animate(deltaTime);
        this.drawables[i].update(deltaTime);        
    }    
};

Drawable.prototype.animate = function(deltaTime) {
    // Override in inheritting class if this functionality is needed.
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
            this.threeJsSceneObject.position.x, this.threeJsSceneObject.position.z);
    
    this.movementX = Math.cos(angle);
    this.movementZ = Math.sin(angle);
    
    this.rotationY = angle;
};
