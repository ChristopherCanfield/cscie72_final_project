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
function FloorLamp(xLeft, yBottom, zBack, zone, gameScene) {
    Drawable.call(this);
    zone.addDrawable(this);
    
    var poleTexture = cdc.textureManager.getTexture(Textures.METAL_3);
    var material = new THREE.MeshPhongMaterial({ 
        map: poleTexture
    });
    poleTexture.repeat.set(1, 1);
    
    this.poleGeometry = new THREE.CylinderGeometry(2, 6, 60, 8, 1, true);
    var poleMesh = new THREE.Mesh(this.poleGeometry, material);
    poleMesh.position.set(xLeft, yBottom, zBack);
    this.threeJsDrawable = poleMesh;
    
    var bulbTexture = cdc.textureManager.getTexture(Textures.FIRE_4);
    var material = new THREE.MeshBasicMaterial({ 
        map: bulbTexture
    });
    bulbTexture.repeat.set(1, 1);
    
    var bulbGeometry = new THREE.SphereGeometry(6, 10, 10);
    this.bulb = new THREE.Mesh(bulbGeometry, material);
    this.bulb.position.set(0, 40, 0);
    poleMesh.add(this.bulb);
    
    var light = new THREE.PointLight(0xffffff, 1.5, 450);
    this.bulb.add(light);
    
    var smokeParticle = new Particle(null, new THREE.Vector3(xLeft, yBottom + 47, zBack), new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(0, 1, 0), 
                                0.125, new THREE.Color("rgb(255, 216, 0)"), 3000);
    var smokeSystem = new ContinuousParticleSystem(zone, gameScene.getThreeJsScene(), 5, 500, smokeParticle, ParticleSpread.SMALL_MEDIUM);
    zone.addParticleSystem(smokeSystem);
    
    // TODO: Add light & particle system (continuous, up)
    
    
    // Prevent camera from walking through light.
    this.blockedArea = new BlockedArea(new BoundingBox(xLeft, 6, yBottom, 50, zBack - 6, 6));
    zone.addBlockedArea(this.blockedArea);
}

FloorLamp.prototype = Object.create(Drawable.prototype);
FloorLamp.prototype.constructor = FloorLamp;

// Inherited from Drawable
FloorLamp.prototype.updateThis = function(deltaTime) {
    this.bulb.rotation.y += 0.01;
};
