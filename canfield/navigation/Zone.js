/**
 * @author Christopher D. Canfield
 * Zone.js
 * November 2013
 */



function Zone(boundingBox) {
    this.boundingBox = boundingBox;
    // Areas in the zone that are impassable.
    this.blockedAreas = [];
    // Zones that are adjacent to this Zone.
    this.adjacentZones = [];
    // Whether the Zone is visible.
    this.visible = false;
    
    this.drawableObjects = [];
    
    this.id = Zone.nextId++;
    
    this.particleSystems = [];
}

Zone.nextId = 0;

Zone.prototype.getBoundingBox = function() {
    return this.boundingBox;
};

Zone.prototype.setBoundingBox = function(boundingBox) {
    this.boundingBox = boundingBox;
};


Zone.prototype.getBlockedAreas = function() {
    return this.blockedAreas;
};

/**
 * Returns true if the specified bounding box intersects with at least one
 * of the blocked areas in this zone.
 */
Zone.prototype.intersectsWithBlockedArea = function(boundingBox) {
    for (var i = 0; i < this.blockedAreas.length; ++i)
    {
        if (this.blockedAreas[i].intersects(boundingBox))
        {
            return true;
        }
    }
    return false;
};

/**
 * Adds a blocked area to the zone. The Player can't move through a blocked area.
 * @param {BlockedArea} blockedArea
 */
Zone.prototype.addBlockedArea = function(blockedArea) {
    this.blockedAreas.push(blockedArea);
};


/**
 * Removes a blocked area from the zone, enabling the player to move through
 * that area.
 * @param {BlockedArea} blockedArea
 */
Zone.prototype.removeBlockedArea = function(blockedArea) {
    for (var i = 0; i < this.blockedAreas.length; ++i)
    {
        if (this.blockedArea[i].id == blockedArea.id)
        {
            this.blockedAreas.splice(i, 1);
            return;
        }
    }
};


/**
 * 
 * @param {Zone} zone
 */
Zone.prototype.addAdjacentZone = function(zone) {
    this.adjacentZones.push(zone);
};

Zone.prototype.getAdjacentZones = function() {
    return this.adjacentZones;
};


Zone.prototype.addParticleSystem = function(particleSystem) {
    this.particleSystems.push(particleSystem);
};

Zone.prototype.updateParticles = function(deltaTime) {
    for (var i = 0; i < this.particleSystems.length; ++i)
    {
        this.particleSystems[i].update(deltaTime);
    }
};

Zone.prototype.addDrawable = function(drawable) {
    this.drawableObjects.push(drawable.threeJsDrawable);
};

Zone.prototpe.setVisible = function(visible) {
    if (visible != this.visible)
    {
        this.visible = visible;
        for (var i = 0; i < this.drawableObjects.length; ++i)
        {
            this.drawableObjects.visible = visible;
        }
    }
};

Zone.prototype.isVisible = function() {
    return this.visible;
};
