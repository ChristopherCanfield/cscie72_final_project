/**
 * @author Christopher D. Canfield
 * Zone.js
 * November 2013
 */



function Zone(boundingBox) {
    this.boundingBox = boundingBox;
    this.blockedAreas = [];
    this.adjacentZones = [];
    
    this.particleSystems = [];
}

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


Zones.prototype.addParticleSystem = function(particleSystem) {
    this.particleSystems.push(particleSystem);
};

Zones.prototype.updateParticles = function(deltaTime) {
    for (var i = 0; i < this.particleSystems; ++i)
    {
        this.particleSystems[i].update(deltaTime);
    }
};

Zones.prototype.renderParticles = function(glContext, threeJsScene, threeJsCamera) {
    for (var i = 0; i < this.particleSystems; ++i)
    {
        this.particleSystems[i].render(glContext, threeJsScene, threeJsCamera);
    }
};
