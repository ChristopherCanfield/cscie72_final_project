/**
 * @author Christopher D. Canfield
 * GeometryHelper.js
 * October 2013
 */


var GeometryHelper = {};

/**
 * Returns a list of 12 faces for a cube.
 */
GeometryHelper.getCube = function()
{
    var targetArray = [];    
    
    // Side 0 (front)
    targetArray.push(new THREE.Face3(0, 1, 3));
    targetArray.push(new THREE.Face3(0, 3, 2));

    // Side 1 (right)
    targetArray.push(new THREE.Face3(1, 5, 7));
    targetArray.push(new THREE.Face3(1, 7, 3));

    // Side 2 (back)
    targetArray.push(new THREE.Face3(5, 4, 6));
    targetArray.push(new THREE.Face3(5, 6, 7));

    // Side 3 (left)
    targetArray.push(new THREE.Face3(4, 0, 2));
    targetArray.push(new THREE.Face3(4, 2, 6));

    // Side 4 (top)
    targetArray.push(new THREE.Face3(2, 3, 7));
    targetArray.push(new THREE.Face3(2, 7, 6));

    // Side 5 (bottom)
    targetArray.push(new THREE.Face3(4, 5, 1));
    targetArray.push(new THREE.Face3(4, 1, 0)); 
    
    return targetArray;
};
