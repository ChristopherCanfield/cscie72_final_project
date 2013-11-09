/**
 * @author Christopher D. Canfield
 * Sun.js
 * Adapted from Sphere.js, used in the Lost World project in October 2013.
 * November 2013
 */



function Sun(x, y, z, numOfSegments, r, color) {
    Drawable.call(this);

    this.geometry = new THREE.SphereGeometry(r, numOfSegments, numOfSegments);
        
    for (var i = 0; i < this.geometry.faces.length; ++i)
    {
        this.geometry.faces[i].vertexColors.push(color, color, color);
    }
    
    var material = new THREE.MeshBasicMaterial({ 
        vertexColors: THREE.VertexColors
    });
    this.threeJsSceneObject = new THREE.Mesh(this.geometry, material);
    
    this.threeJsSceneObject.position = new THREE.Vector3(x, y, z);
}

Sphere.prototype = Object.create(Drawable.prototype);
Sphere.prototype.constructor = Sphere;

