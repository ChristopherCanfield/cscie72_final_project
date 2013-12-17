/**
 * @author Christopher D. Canfield
 * MathHelper.js
 * October 2013
 */



function MathHelper() {}

MathHelper.angleInRadians = function(point1x, point1z, point2x, point2z) {
    var deltaZ = point1z - point2z;
    var deltaX = point1x - point2x;
    return Math.atan2(deltaZ, deltaX);
};

MathHelper.degreesToRadians = function(degrees) {
    return (degrees * Math.PI / 180.0);
};

MathHelper.radiansToDegrees = function(radians) {
    return (radians * 180.0 / Math.PI);
};


/**
 * Returns a random integer between min and max, inclusive of each.
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FMath%2Frandom
 * @param {Object} min
 * @param {Object} max
 */
MathHelper.randomInt = function(min, max) {
    if (typeof min === "undefined")
    {
        min = 0;
    }
    if (typeof max === "undefined")
    {
        max = Number.MAX_VALUE - 10;
    }
    
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
 * @param {Object} min
 * @param {Object} max
 */
MathHelper.randomNumber = function(min, max) {
  return Math.random() * (max - min) + min;
};

/**
 * 
 * @param {THREE.Vector3} vec3
 * @param {float} minPctAdjustment
 * @param {float} maxPctAdjustment
 * @param {float} modifier An optional modifier value (optional)
 */
MathHelper.adjustVector3 = function(vec3, minPctAdjustment, maxPctAdjustment, modifier) {
    var x, y, z = 0;
    if (typeof modifier === "undefined")
    {
        x = vec3.x * MathHelper.randomNumber(minPctAdjustment, maxPctAdjustment);
        y = vec3.y * MathHelper.randomNumber(minPctAdjustment, maxPctAdjustment);
        z = vec3.z * MathHelper.randomNumber(minPctAdjustment, maxPctAdjustment);
    {
    else
    {
        var dir = MathHelper.randomNumber(1, 2);
        if (dir !== 1) dir = -1;
        x = vec3.x + dir * modifier * MathHelper.randomNumber(minPctAdjustment, maxPctAdjustment);
        y = vec3.y + dir * modifier * MathHelper.randomNumber(minPctAdjustment, maxPctAdjustment);
        z = vec3.z + dir * modifier * MathHelper.randomNumber(minPctAdjustment, maxPctAdjustment);
    }
            
    return new THREE.Vector3(x, y, z);
};
