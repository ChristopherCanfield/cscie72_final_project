/**
 * @author Christopher D. Canfield
 * Zone.js
 * November 2013
 */



function Zone(boundingBox) {
    this.boundingBox = boundingBox;
    this.blockedAreas = [];
};

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
