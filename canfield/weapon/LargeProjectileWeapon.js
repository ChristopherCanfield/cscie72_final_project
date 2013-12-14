/**
 * @author Christopher D. Canfield
 * LargeProjectileWeapon.js
 * December 2013
 */


function LargeProjectileWeapon(threeJsScene) {
    Weapon.call(this);
    
    this.particleSystemPool = new ParticleSystemPool(threeJsScene, 5, 200);
}

LargeProjectileWeapon.prototype = Object.create(Weapon.prototype);
LargeProjectileWeapon.prototype.constructor = LargeProjectileWeapon;


LargeProjectileWeapon.prototype.shootProjectile = function(zone, location, rotation, target) {
    var position = new THREE.Vector3(location.x, location.y, location.z);
    var rotation = new THREE.Vector3(rotation.x, rotation.y, rotation.z);
    var movementVector = new THREE.Vector3(0, 0, 5);

    var size = 0.4;
    var lifetime = 1500;

    var projectile = new Projectile(zone, this.particleSystemPool, movementVector, rotation,
            position, size, lifetime,
            cdc.textureManager.getTexture(Textures.FIRE_1), 1, 1);
    
    this.projectiles.push(projectile);
};