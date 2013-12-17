/**
 * @author Christopher D. Canfield
 * BoundingBox.js
 * October 2013
 */


/**
 * @param {float} xLeft
 * @param {float} width
 * @param {float} yBottom
 * @param {float} height
 * @param {float} zBack
 * @param {float} depth 
 */
function BoundingBox(xLeft, width, yBottom, height, zBack, depth) {
    this.xLeft = xLeft;
    this.width = width;
    this.yBottom = yBottom;
    this.height = height;
    this.zBack = zBack;
    this.depth = depth;
    
    this.id = BoundingBox.id;
    BoundingBox.id++;
}

BoundingBox.id = 0;

/**
 * Returns true if the otherBox is equal to this box. 
 */
BoundingBox.prototype.equals = function(otherBox) {
    return (this.xLeft === otherBox.xLeft &&
            this.width === otherBox.width &&
            this.yBottom === otherBox.yBottom &&
            this.height === otherBox.height &&
            this.zBack === otherBox.zBack &&
            this.depth === otherBox.depth);
};

/**
 * 
 * @param {BoundingBox} otherBox
 * @return boolean specifying whether the two BoundingBoxes intersect.
 */
BoundingBox.prototype.intersects = function(otherBox) {
    if (this.id === otherBox.id || this.equals(otherBox))
    {
        return true;
    }
    
    var intersectsX = BoundingBox.overlapsX(this, otherBox);
    var intersectsY = BoundingBox.overlapsY(this, otherBox);
    var intersectsZ = BoundingBox.overlapsZ(this, otherBox);   
    
    return (intersectsX && intersectsY && intersectsZ);
};


BoundingBox.overlapsX = function(box1, box2) {
    return ((box1.xLeft <= (box2.xLeft + box2.width) &&
            box1.xLeft >= box2.xLeft) ||
            ((box1.xLeft + box1.width) >= box2.xLeft &&
            box1.xLeft <= box2.xLeft)); 
};

BoundingBox.overlapsY = function(box1, box2) {
    return ((box1.yBottom <= (box2.yBottom + box2.height) &&
            box1.yBottom >= box2.yBottom) ||
            ((box1.yBottom + box1.height) >= box2.yBottom &&
            box1.yBottom <= box2.yBottom)); 
};

BoundingBox.overlapsZ = function(box1, box2) {
    return ((box1.zBack <= (box2.zBack + box2.depth) &&
            box1.zBack >= box2.zBack) ||
            ((box1.zBack + box1.depth) >= box2.zBack &&
            box1.zBack <= box2.zBack)); 
};

/**
 * Returns a clone of this BoundingBox. 
 */
BoundingBox.prototype.clone = function() {
    return new BoundingBox(this.xLeft, this.width, this.yBottom, this.height, this.zBack, this.depth);
};
