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
 */
MathHelper.adjustVector3 = function(vec3, minPctAdjustment, maxPctAdjustment) {
    var x, y, z;
    if (typeof modifier === "undefined")
    {
        x = vec3.x * MathHelper.randomNumber(minPctAdjustment, maxPctAdjustment);
        y = vec3.y * MathHelper.randomNumber(minPctAdjustment, maxPctAdjustment);
        z = vec3.z * MathHelper.randomNumber(minPctAdjustment, maxPctAdjustment);
    }
            
    return new THREE.Vector3(x, y, z);
};

/**
 * 
 * @param {THREE.Vector3} vec3
 * @param {THREE.Vector3} min
 * @param {THREE.Vector3} max
 */
MathHelper.adjustVector3_2 = function(vec3, min, max) {
    var x, y, z;
    if (typeof modifier === "undefined")
    {
        var dirX = (MathHelper.randomInt(1, 2) === 1) ? 1 : -1;
        var dirY = (MathHelper.randomInt(1, 2) === 1) ? 1 : -1;
        var dirZ = (MathHelper.randomInt(1, 2) === 1) ? 1 : -1;
        x = vec3.x + dirX * MathHelper.randomNumber(min.x, max.x);
        y = vec3.y + dirY * MathHelper.randomNumber(min.y, max.y);
        z = vec3.z + dirZ * MathHelper.randomNumber(min.z, max.z);
    }
            
    return new THREE.Vector3(x, y, z);
};