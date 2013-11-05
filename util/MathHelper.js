/**
 * @author Christopher D. Canfield
 * MathHelper.js
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