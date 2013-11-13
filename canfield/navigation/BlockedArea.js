/**
 * @author Christopher D. Canfield
 * BlockedArea.js
 * November 2013
 */


/**
 * An area that the player can't enter.
 * @param {BoundingBox} boundingBox
 */
function BlockedArea(boundingBox) {
    this.boundingBox = boundingBox;
    this.id = MathHelper.randomInt();
};

BlockedArea.prototype.getBoundingBox = function() {
    return this.boundingBox;    
};
