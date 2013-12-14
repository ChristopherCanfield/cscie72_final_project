/**
 * @author Christopher D. Canfield
 * WeaponController.js
 * December 2013
 */



/**
 * Processes user input related to the character's weapon.
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
    this.weapons[selectedWeaponIndex].update(deltaTime);
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
        console.log("shot fired");
        
        this.weapons[selectedWeaponIndex].shootProjectile(zone, camera.yawObject.position, 
                camera.zones.getCurrentZones(camera.getBoundingBox()));
        // TODO: Allow additional keys, such as a mouse click?
    }
    // TODO: add ability to select different weapons.
};