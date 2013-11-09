/**
 * @author Christopher D. Canfield
 * BoundingBox.js
 * October 2013
 */


function BoundingBox(xLeft, width, yTop, height, zFront, depth) {
    Drawable.call(this);
    
    this.xLeft = xLeft;
    this.width = width;
    this.yTop = yTop;
    this.height = height;
    this.zFront = zFront;
    this.depth = depth;
    
    this.id = BoundingBox.id;
    BoundingBox.id++;
}

BoundingBox.id = 0;

/**
 * 
 * @param {BoundingBox} otherBox
 * @return boolean specifying whether the two BoundingBoxes intersect.
 */
BoundingBox.prototype.intersects = function(otherBox) {
    if (this.id === otherBox.id)
    {
        return false;
    }
    
    return (BoundingBox.overlapsX(this, otherBox) &&
            BoundingBox.overlapsY(this, otherBox) &&
            BoundingBox.overlapsZ(this, otherBox));    
};


BoundingBox.overlapsX = function(box1, box2) {
    return ((box1.xLeft <= (box2.xLeft + box2.width) &&
            box1.xLeft >= box2.xLeft) ||
            ((box1.xLeft + box1.width) >= box2.left &&
            box1.xLeft <= box2.xLeft)); 
};

BoundingBox.overlapsY = function(box1, box2) {
    return ((box1.yTop >= (box2.yTop - box2.height) &&
            box1.yTop <= box2.yTop) ||
            ((box1.yTop - box1.height) <= box2.yTop &&
            box1.yTop >= box2.yTop)); 
};

BoundingBox.overlapsZ = function(box1, box2) {
    return ((box1.zFront >= (box2.zFront - box2.depth) &&
            box1.zFront <= box2.zFront) ||
            ((box1.zFront - box1.depth) <= box2.zFront &&
            box1.zFront >= box2.zFront)); 
};
