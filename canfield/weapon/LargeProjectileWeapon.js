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


LargeProjectileWeapon.prototype.shootProjectile = function(zone, location) {
    var particleSpeed = new THREE.Vector3(13.5, 10.5, 13.5);
    var particleSize = 0.4;
    var particleLifetime = 1750;
    
    var p = this.particleSystemPool.getExplosionParticleSystem(zone, lifetime, 200, 
            location, particleSpeed, particleSize, new THREE.Color(), particleLifetime, ParticleSpread.SMALL);
    if (p !== null)
    {
        zone.addParticleSystem(p);
        this.projectiles[i].push(p);
    }
};