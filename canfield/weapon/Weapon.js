/**
 * @author Christopher D. Canfield
 * Weapon.js
 * December 2013
 */


/**
 * Base class for 
 * @param {Object} threeJsScene
 */
function Weapon() {
    this.projectiles = [];
    this.particleSystemPool = null; // set in subclass.
}

Weapon.prototype.update = function(deltaTime) {
    for (var i = 0; i < this.projectiles.length; ++i)
    {
        var projectile = this.projectiles[i];
        if (projectile.isDone())
        {
            this.projectiles.splice(i, 1);
        }
        else
        {
            this.projectiles[i].update(deltaTime);
        }
    }
};

// Override in subclass.
Weapon.prototype.shootProjectile = function(zone, location, rotation) {
    throw "Weapon.shootProjectile: method must be overridden.";
};
