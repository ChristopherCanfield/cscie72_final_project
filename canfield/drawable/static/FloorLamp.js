/**
 * @author Christopher D. Canfield
 * FloorLamp.js
 * November 2013
 */



/**
 * Creates a floor lamp, which generates light and a bit of smoke.
 * @param {float} xLeft
 * @param {float} yBottom
 * @param {float} zBack
 * @param {Zone} zone The zone that the lamp falls within.
 */
function FloorLamp(xLeft, yBottom, zBack, zone) {
    Drawable.call(this);
    zone.addDrawable(this);
    
    var poleTexture = cdc.textureManager.getTexture(Textures.METAL_2);
    var material = new THREE.MeshLambertMaterial({ 
        map: texture
    });
    poleTexture.repeat.set(1, 1);
    
    this.poleGeometry = new THREE.CylinderGeometry(2, 6, 20, 8, 1, true);
    var poleMesh = new THREE.Mesh(this.poleGeometry, material);
    poleMesh.position.set(xLeft, yBottom, zBack);
    this.threeJsDrawable = poleMesh;
    
    var bulbTexture = cdc.textureManager.getTexture(Textures.FIRE_4);
    var material = new THREE.MeshBasicMaterial({ 
        map: texture
    });
    bulbTexture.repeat.set(1, 1);
    
    var bulbGeometry = new THREE.CubeGeometry(6, 8, 6);
    var bulbMesh = new THREE.Mesh(bulbGeometry, material);
    bulbMesh.position.set(xLeft, yBottom, zBack);
    poleMesh.add(bulbMesh);
    
    // TODO: Add light & particle system (continuous, up)
    
    
    // Prevent camera from walking through light.
    this.blockedArea = new BlockedArea(new BoundingBox(xLeft, width, yBottom, height, zBack - depth, depth));
    zone.addBlockedArea(this.blockedArea);
}

FloorLamp.prototype = Object.create(Drawable.prototype);
FloorLamp.prototype.constructor = FloorLamp;