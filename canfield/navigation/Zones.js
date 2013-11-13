/**
 * @author Christopher D. Canfield
 * Zones.js
 * November 2013
 */



function Zones() {
    this.zones = [];
};


/**
 * Adds a zone to the Zones list.
 * @param {Zone} zone
 */
Zones.prototype.add = function(zone) {
    if (typeof zone != 'Zone')
    {
        throw 'Invalid parameter provided to Zones.add. Expted Zone, founded ' + (typeof zone);
    }
    this.zones.add(zone);
};

/**
 * Returns a list of zones that the bounding box touches. Note that multiple
 * zones may be returned.
 * @param {BoundingBox} boundingBox
 */
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
