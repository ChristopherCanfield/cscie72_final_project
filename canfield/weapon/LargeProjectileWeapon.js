/**
 * @author Christopher D. Canfield
 * LargeProjectileWeapon.js
 * December 2013
 */


function LargeProjectileWeapon(threeJsScene, camera) {
    Weapon.call(this);
    
    this.threeJsScene = threeJsScene;
    this.camera = camera;
    this.particleSystemPool = new ParticleSystemPool(threeJsScene, 6, 400);
}

LargeProjectileWeapon.prototype = Object.create(Weapon.prototype);
LargeProjectileWeapon.prototype.constructor = LargeProjectileWeapon;


LargeProjectileWeapon.prototype.shootProjectile = function(zone, location, rotation) {
    if (this.cooldown < this.minCooldown)
    {
        return;
    }
    this.cooldown = 0;
    
    var position = new THREE.Vector3(location.x, location.y, location.z);
    var rotation = new THREE.Vector3(rotation.x, rotation.y, rotation.z);
    var movementVector = new THREE.Vector3(0, 0, 200);

    var size = 7.5;
    var lifetime = 1500;

    var projectile = new Projectile(zone, this.particleSystemPool, this.threeJsScene, this.camera,
            movementVector, rotation, position, size, lifetime,
            Textures.FIRE_1, 1, 1);
    
    this.projectiles.push(projectile);
    projectile.addToThreeJsScene(this.threeJsScene);
};