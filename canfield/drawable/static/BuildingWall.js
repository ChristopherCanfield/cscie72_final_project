/**
 * @author Christopher D. Canfield
 * BuildingWall.js
 * November 2013
 */



function BuildWall() {
    Drawable.call(this);
    
    
};


BuildWall.prototype = Object.create(Drawable.prototype);
BuildWall.prototype.constructor = BuildWall;