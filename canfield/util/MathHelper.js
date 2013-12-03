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
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FMath%2Frandom
 * @param {Object} min
 * @param {Object} max
 */
MathHelper.randomInt = function(min, max) {
    if (typeof min == "undefined")
    {
        min = 0;
    }
    if (typeof max == "undefined")
    {
        max = Number.MAX_INTEGER;
    }
    
    return Math.floor(Math.random() * (max - min + 1) + min);
};

