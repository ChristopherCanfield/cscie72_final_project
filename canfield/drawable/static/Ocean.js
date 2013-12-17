/**
 * @author Christopher D. Canfield
 * Ocean.js
 * October 2013
 */


function Ocean(xLeft, yBottom, zBack, width, height, depth) {
    Drawable.call(this);
    
    this.geometry.vertices.push(
        // v0
        new THREE.Vector3(Ground.X_MAX, Ground.Y_BOTTOM, Ground.Z_MIN),
        // v1
        new THREE.Vector3(Ground.X_MIN, Ground.Y_BOTTOM, Ground.Z_MIN),
        // v2
        new THREE.Vector3(Ground.X_MAX, Ground.Y_TOP, Ground.Z_MIN),
        // v3
        new THREE.Vector3(Ground.X_MIN, Ground.Y_TOP, Ground.Z_MIN),
        
        // v4
        new THREE.Vector3(Ground.X_MAX, Ground.Y_BOTTOM, Ground.Z_MAX),
        // v5
        new THREE.Vector3(Ground.X_MIN, Ground.Y_BOTTOM, Ground.Z_MAX),
        // v6
        new THREE.Vector3(Ground.X_MAX, Ground.Y_TOP, Ground.Z_MAX),
        // v7
        new THREE.Vector3(Ground.X_MIN, Ground.Y_TOP, Ground.Z_MAX)
    );
    
    this.geometry.faces = GeometryHelper.getCube();
    
    for (var i = 0; i < this.geometry.faces[0].length; i += 2)
    {
        this.geometry.faces[i].faceVertexUvs[0].push([new THREE.Vector2(0, 1), new THREE.Vector2(1, 1), new THREE.Vector2(1, 0)]);
        this.geometry.faces[i].materialIndex = 0;
        
        this.geometry.faces[i+1].faceVertexUvs[0].push([new THREE.Vector2(0, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)]);
        this.geometry.faces[i].materialIndex = 0;
    }
    
    this.geometry.computeFaceNormals();
    this.geometry.computeCentroids();
    this.geometry.computeVertexNormals();
    
    var texture = cdc.textureManager.getTexture(Textures.WATER_1);
    var material = new THREE.MeshPhongMaterial({ 
        map: texture
    });
    texture.repeat.set(35, 35);
    
    this.geometry = new THREE.CubeGeometry(Ocean.WIDTH, 0.5, Ocean.DEPTH);
    var mesh = new THREE.Mesh(this.geometry, material);
    mesh.position.set(0, -3, 0);
    
    this.threeJsDrawable = mesh;
}

Ocean.prototype = Object.create(Drawable.prototype);
Ocean.prototype.constructor = Ocean;

Ocean.WIDTH = 10000.0;

Ocean.Y_TOP = 100.0;
Ocean.Y_BOTTOM = 0.0;

Ocean.DEPTH = 10000.0;