/**
 * @author Christopher D. Canfield
 * Ground.js
 */


function Ground() {
    Drawable.call(this);
    
    // this.geometry.vertices.push(
        // // v0
        // new THREE.Vector3(Ground.X_MAX, Ground.Y_BOTTOM, Ground.Z_MIN),
        // // v1
        // new THREE.Vector3(Ground.X_MIN, Ground.Y_BOTTOM, Ground.Z_MIN),
        // // v2
        // new THREE.Vector3(Ground.X_MAX, Ground.Y_TOP, Ground.Z_MIN),
        // // v3
        // new THREE.Vector3(Ground.X_MIN, Ground.Y_TOP, Ground.Z_MIN),
//         
        // // v4
        // new THREE.Vector3(Ground.X_MAX, Ground.Y_BOTTOM, Ground.Z_MAX),
        // // v5
        // new THREE.Vector3(Ground.X_MIN, Ground.Y_BOTTOM, Ground.Z_MAX),
        // // v6
        // new THREE.Vector3(Ground.X_MAX, Ground.Y_TOP, Ground.Z_MAX),
        // // v7
        // new THREE.Vector3(Ground.X_MIN, Ground.Y_TOP, Ground.Z_MAX)
    // );
    // this.geometry.faces = GeometryHelper.getCube();
//     
    // for (var i = 0; i < this.geometry.faces[0].length; i += 2)
    // {
        // this.geometry.faces[i].faceVertexUvs[0].push([new THREE.Vector2(0, 1), new THREE.Vector2(1, 1), new THREE.Vector2(1, 0)]);
        // this.geometry.faces[i].materialIndex = 0;
//         
        // this.geometry.faces[i+1].faceVertexUvs[0].push([new THREE.Vector2(0, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)]);
        // this.geometry.faces[i].materialIndex = 0;
    // }

    this.geometry.computeFaceNormals();
    this.geometry.computeCentroids();
    this.geometry.computeVertexNormals();
    
    var texture = cdc.textureManager.getTexture(Textures.GROUND_GRASS_MUD);
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    texture.repeat.set(20, 20);
    
    this.geometry = new THREE.CubeGeometry(Ground.WIDTH, 10, Ground.DEPTH);
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(0, Ground.Y_TOP, 0);
    
    this.threeJsDrawable = mesh;
}

Ground.prototype = Object.create(Drawable.prototype);
Ground.prototype.constructor = Ground;

Ground.WIDTH = 1000.0;
Ground.X_MAX = 1000.0;
Ground.X_MIN = 0.0;

Ground.Y_TOP = 0.0;

Ground.Z_MAX = 1000.0;
Ground.Z_MIN = 0.0;
Ground.DEPTH = 1000.0;