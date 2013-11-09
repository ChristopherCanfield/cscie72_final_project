/**
 * @author Christopher D. Canfield
 * NavPoint.js
 * October 2013
 */



function NavPoint(x, y, z) {
    Drawable.call(this);
    
    /** A list of NavPoints that are attached to this point. */
    this.next = [];
    
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.id = NavPoint.generateId();
}

NavPoint.id = 0;

NavPoint.generateId = function() {
    var id = NavPoint.id;
    NavPoint.id++;
    return id; 
};
