/**
 * @author Christopher D. Canfield
 * Zones.js
 * November 2013
 */



function Zones() {
    this.zones = [];
};


Zones.prototype.add = function(zone) {
    this.zones.add(zone);  
};


Zones.prototype.getCurrentZones = function(boundingBox) {
    var currentZones = [];
    for (var i = 0; i < zones.length; ++i)
    {
        if (zones[i].getBoundingBox().intersects(boundingBox))
        {
            currentZones.add(zones[i]);
        }
    }
    return currentZones;
};
