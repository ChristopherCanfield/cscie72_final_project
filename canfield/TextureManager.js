/**
 * @author Christopher D. Canfield
 * TextureManager.js
 * October 2013; Updated November 2013
 */




function Textures() {}

Textures.GROUND_GRASS_MUD = "textures/ground/grass_ground2.jpg";
Textures.GROUND_MUD = "textures/ground/mud_grass.jpg";

Textures.TREAD_STEEL = "textures/metal/steelpops9.jpg";
Textures.TREAD_BRASS = "textures/metal/pops_brass.jpg";

Textures.METAL_1 = "textures/metal/bronze1.jpg";
Textures.METAL_2 = "textures/metal/bronze2.jpg";
Textures.METAL_3 = "textures/metal/bronze4.jpg";
Textures.METAL_4 = "textures/metal/bronze6.jpg";
Textures.METAL_5 = "textures/metal/bronze7.jpg";
Textures.METAL_6 = "textures/metal/bronze8.jpg";
Textures.METAL_7 = "textures/metal/bronze9.jpg";
Textures.METAL_8 = "textures/metal/copper01.jpg";
Textures.METAL_9 = "textures/metal/hammered_brass.jpg";

Textures.RUST_1 = "textures/rust/ferro.jpg";
Textures.RUST_2 = "textures/rust/rust07.jpg";
Textures.RUST_3 = "textures/rust/rust12.jpg";
Textures.RUST_4 = "textures/rust/rust13.jpg";
Textures.RUST_5 = "textures/rust/rust23.jpg";
Textures.RUST_6 = "textures/rust/rust28.jpg";
Textures.RUST_7 = "textures/rust/rust32.jpg";
Textures.RUST_8 = "textures/rust/rust16.jpg";

Textures.WATER_1 = "textures/water/natural1.jpg";
Textures.WATER_2 = "textures/water/water06.jpg";
Textures.WATER_3 = "textures/water/water01.jpg";
Textures.WATER_4 = "textures/water/ripples2.jpg";

Textures.BARK_1 = "textures/bark/bark8.jpg";
Textures.BARK_2 = "textures/bark/bark9.jpg";
Textures.BARK_3 = "textures/bark/bark11.jpg";
Textures.BARK_4 = "textures/bark/bark14.jpg";
Textures.BARK_5 = "textures/bark/bark32.jpg";
Textures.BARK_6 = "textures/bark/barklores_a.jpg";
Textures.BARK_7 = "textures/bark/barklores_c.jpg";

Textures.LEAVES_1 = "textures/leaves/foliage1.jpg";
Textures.LEAVES_2 = "textures/leaves/foliage2.jpg";
Textures.LEAVES_3 = "textures/leaves/leaf7.jpg";
Textures.LEAVES_4 = "textures/leaves/leaf8.jpg";
Textures.LEAVES_5 = "textures/leaves/mapleleaf1.jpg";

Textures.ROCK_1 = "textures/rock/cliff_plants.jpg";
Textures.ROCK_2 = "textures/rock/rock02.jpg";
Textures.ROCK_3 = "textures/rock/rock08.jpg";
Textures.ROCK_4 = "textures/rock/rock18.jpg";

Textures.WALL_1 = "textures/wall/rock10.jpg";
Textures.WALL_2 = "textures/wall/rock36.jpg";
Textures.WALL_3 = "textures/wall/rockwall1.jpg";
Textures.WALL_4 = "textures/wall/stonewall.jpg";
Textures.WALL_5 = "textures/wall/stonewall2.jpg";

Textures.FIRE_1 = "textures/fire/fire1.jpg";
Textures.FIRE_2 = "textures/fire/fire2.jpg";
Textures.FIRE_3 = "textures/fire/fire3.jpg";
Textures.FIRE_4 = "textures/fire/fire4.jpg";
Textures.FIRE_5 = "textures/fire/fire5.jpg";

Textures.WOODBOARD_1 = "textures/woodboard/woodboard1.jpg";
Textures.WOODBOARD_2 = "textures/woodboard/woodboard2.jpg";
Textures.WOODBOARD_3 = "textures/woodboard/woodboard3.jpg";
Textures.WOODBOARD_1a = "textures/woodboard/woodboard1a.jpg";

Textures.CONCRETE_1 = "textures/concrete/concrete1.jpg";
Textures.CONCRETE_2 = "textures/concrete/concrete2.jpg";
Textures.CONCRETE_3 = "textures/concrete/concrete3.jpg";
Textures.CONCRETE_4 = "textures/concrete/concrete4.jpg";
Textures.CONCRETE_5 = "textures/concrete/concrete5.jpg";
Textures.CONCRETE_6 = "textures/concrete/concrete6.jpg";
Textures.CONCRETE_7 = "textures/concrete/concrete7.jpg";

Textures.CONTROLS = "textures/instructions/controls2.png";

Textures.WALLDECORATION_1 = "textures/walldecoration/walldecoration1.png";
Textures.WALLDECORATION_2 = "textures/walldecoration/walldecoration2.jpg";
Textures.WALLDECORATION_3 = "textures/walldecoration/walldecoration3.jpg";
Textures.WALLDECORATION_4 = "textures/walldecoration/walldecoration4.jpg";

Textures.DOOR_1 = "textures/door/door1.jpg";

Textures.MASK_1 = "textures/mask/mask1.jpg";
Textures.MASK_2 = "textures/mask/mask2.jpg";
Textures.MASK_3 = "textures/mask/mask3.png";


function TextureManager(glContext) {
    this.textures = {};
    this.gl = glContext;
}

TextureManager.prototype.getTexture = function(texturePath) {    
    if (texturePath in this.textures)
    {
        return this.textures[texturePath];
    }
    else
    {
        var t = THREE.ImageUtils.loadTexture(texturePath);
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;
        t.anisotropy = this.gl.getMaxAnisotropy();
        this.textures[texturePath] = t;
        return t;        
    }
};
