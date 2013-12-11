/**
 * @author Christopher D. Canfield
 * WeaponController.js
 * December 2013
 */



/**
 * Processes user input related to the character's weapon.
 * @param {Weapon[]} weapons Reference to the weapons array.
 */
function WeaponController(weapons) {    
    this.weapons = weapons;
    this.selectedWeaponIndex = 0;
    
    // Set the keydown event handler, and bind this object's "this" pointer to it. 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    window.addEventListener("keydown", this.keyDown.bind(this), false);
};


/**
 * Processes key down events.
 * @param {Object} e A keydown event object.
 */
WeaponController.prototype.keyDown = function(e) {
    if (typeof KeyEvent === "undefined") {
        var KeyEvent = {
            DOM_VK_CONTROL: 17
        };
    }
        
    var keyCode = e.keyCode || e.which;
    
    if (keyCode == KeyEvent.DOM_VK_CONTROL)
    {
        console.log("shot fired");
        // TODO: fire a shot.
        // TODO: Allow additional keys, such as a mouse click?
    }
    // TODO: add ability to select different weapons.
};