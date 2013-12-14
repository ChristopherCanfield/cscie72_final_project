/**
 * @author Christopher D. Canfield
 * WeaponController.js
 * December 2013
 */



/**
 * Processes user input related to the character's weapon.
 * @param {Object} threeJsScene
 * @param {Camera} camera Reference to the camera.
 */
function WeaponController(threeJsScene, camera) {
    this.weapons = [];
    this.weapons.push(new LargeProjectileWeapon(threeJsScene));
    this.selectedWeaponIndex = 0;
    
    this.camera = camera;
    
    // Set the keydown event handler, and bind this object's "this" pointer to it. 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    window.addEventListener("keydown", this.keyDown.bind(this), false);
};

WeaponController.prototype.update = function(deltaTime) {
    var zone = this.camera.zones.getCurrentZones(this.camera.getBoundingBox())[0];
    this.weapons[this.selectedWeaponIndex].update(deltaTime, zone);
};


/**
 * Processes key down events.
 * @param {Object} e A keydown event object.
 */
WeaponController.prototype.keyDown = function(e) {
    if (typeof KeyEvent === "undefined") {
        var KeyEvent = {
            DOM_VK_CONTROL: 17,
            DOM_VK_TAB: 9
        };
    }
        
    var keyCode = e.keyCode || e.which;
    
    if (keyCode === KeyEvent.DOM_VK_CONTROL || keyCode === KeyEvent.DOM_VK_TAB)
    {
        var zone = this.camera.zones.getCurrentZones(this.camera.getBoundingBox())[0];
        this.weapons[this.selectedWeaponIndex].shootProjectile(zone, 
                this.camera.yawObject.position, this.camera.yawObject.rotation);
        this.camera.removeGameControlSheet();
    }
    // TODO: add ability to select different weapons.
};