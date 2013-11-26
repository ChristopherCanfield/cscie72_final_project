/**
 * @author Christopher D. Canfield
 * TestScene.js
 * November 2013
 */


/**
 * The root node for the test scene. This is used to test functionality,
 * without worrying about creating a nice-looking scene.
 */
function TestScene() {
    Drawable.call(this);
    
    this.threeJsScene = new THREE.Scene();
}

TestScene.prototype = Object.create(Drawable.prototype);
TestScene.prototype.constructor = VillageScene;

TestScene.prototype.createScene = function() {
    // Create the navigation graph.
    this.createNavGraph();
    
    this.add(new Ground());
    this.add(new Ocean());
    
    this.addTrees();
    this.addHills();
    this.addWalls();
    
    // TODO: move this guy after testing.
    var node24 = this.navGraph[13];
    var node23 = this.navGraph[12];
    var ballGuy = new BallGuy(this, this.navGraph, node24, node23.id, 0, -60); 
    this.add(ballGuy);
    
    this.add(new BallChild(ballGuy, -10, -35));
    this.add(new BallChild(ballGuy, 10, -5));
    this.add(new BallChild(ballGuy, 0, 20));
    
    var ambientLight = new THREE.AmbientLight(0x404040);
    this.threeJsScene.add(ambientLight);
    
    this.addLights();
    
    // Attach the scene to the three.js scene graph.
    this.addToThreeJsScene(this.threeJsScene);
};


TestScene.prototype.getThreeJsScene = function() {
    return this.threeJsScene;    
};


TestScene.prototype.addTrees = function() {
    // Tree(x, z, height, barkTexturePath, leavesRadius, leavesTexturePath, leavesTextureRepeat)
    
    // Forest, to the left of the starting position:
    this.add(new Tree(-450, -100, 50, 
            Textures.BARK_4,
            15, Textures.LEAVES_5, 9));
            
    this.add(new Tree(-375, -50, 40, 
            Textures.BARK_4,
            15, Textures.LEAVES_4, 8));
            
    this.add(new Tree(-430, -150, 30, 
            Textures.BARK_1,
            15, Textures.LEAVES_4, 8));
            
    this.add(new Tree(-330, -10, 25, 
            Textures.BARK_1,
            10, Textures.LEAVES_3, 8));
            
    this.add(new Tree(-370, -80, 25, 
            Textures.BARK_1,
            10, Textures.LEAVES_3, 8));
            
    this.add(new Tree(-350, -65, 45, 
            Textures.BARK_4,
            15, Textures.LEAVES_2, 8));
            
    this.add(new Tree(-440, -125, 40, 
            Textures.BARK_4,
            15, Textures.LEAVES_3, 8));
            
    this.add(new Tree(-400, -100, 45, 
            Textures.BARK_4,
            15, Textures.LEAVES_3, 8));
            
    var forestLight = new THREE.PointLight(0xA2E200, 8, 100); 
    forestLight.position.set(-375, 75, 0); 
    this.threeJsScene.add(forestLight);
    
    var forestLight2 = new THREE.PointLight(0xA2E200, 8, 100); 
    forestLight2.position.set(-400, 75, -60); 
    this.threeJsScene.add(forestLight2);
    
    // Small ground of trees behind the starting position:
    this.add(new Tree(225, 225, 80, 
            Textures.BARK_4,
            15, Textures.LEAVES_3, 8));
    this.add(new Tree(240, 215, 60, 
            Textures.BARK_4,
            15, Textures.LEAVES_3, 8));
    this.add(new Tree(210, 215, 55, 
            Textures.BARK_4,
            15, Textures.LEAVES_3, 8));
    this.add(new Tree(250, 230, 65, 
            Textures.BARK_4,
            15, Textures.LEAVES_3, 8));
            
    var forestLight3 = new THREE.PointLight(0xA2E200, 3, 100); 
    forestLight3.position.set(200, 5, 200); 
    forestLight3.rotation.x = Math.PI / 2;
    this.threeJsScene.add(forestLight3);
};


TestScene.prototype.addWalls = function() {
    // StoneWall(x, z, width, height, depth, texturePath, textureRepeatX, textureRepeatY, textureRepeatXTop)
    
    this.add(new StoneWall(0, -500, 1000, 30, 10, 
            Textures.WALL_4, 40, 3, 35));
            
    this.add(new StoneWall(0, 500, 1000, 30, 10, 
            Textures.WALL_4, 40, 3, 35));
            
    var stoneWallLeft = new StoneWall(-500, 0, 1000, 30, 10, 
            Textures.WALL_4, 40, 3, 35);
    stoneWallLeft.threeJsSceneObject.rotation.y = Math.PI / 2;
    this.add(stoneWallLeft);
    
    var stoneWallRight = new StoneWall(500, 0, 1000, 30, 10, 
            Textures.WALL_4, 40, 3, 35);
    stoneWallRight.threeJsSceneObject.rotation.y = Math.PI / 2;
    this.add(stoneWallRight);
};

TestScene.prototype.addLights = function() {
    var light1 = new THREE.PointLight(0xFFF07C, 3, 110); 
    light1.position.set(0, 65, -50); 
    this.threeJsScene.add(light1);
    
    var light2 = new THREE.PointLight(0xFFF07C, 3, 110); 
    light2.position.set(0, 65, -200); 
    this.threeJsScene.add(light2);
    
    var light3 = new THREE.PointLight(0xFFF07C, 3, 110); 
    light3.position.set(0, 65, -400); 
    this.threeJsScene.add(light3);
    
    var light4 = new THREE.PointLight(0xFFF07C, 3, 300); 
    light4.position.set(0, 100, -450); 
    this.threeJsScene.add(light4);
    
    var light5 = new THREE.PointLight(0xFFF07C, 2, 300); 
    light5.position.set(450, 5, -450);
    light5.rotation.x = Math.PI / 4;
    light5.rotation.y = Math.PI / 2; 
    this.threeJsScene.add(light5);
    
    var light6 = new THREE.PointLight(0xFFF07C, 2, 500); 
    light6.position.set(0, 150, 600);
    this.threeJsScene.add(light6);
    
    var blueLight = new THREE.PointLight(0x93EDFF, 2, 100); 
    blueLight.position.set(425, 425, 60);
    this.threeJsScene.add(blueLight);
    
    var upLight = new THREE.PointLight(0x93EDFF, 2, 100); 
    upLight.position.set(0, 3, 225);
    upLight.rotation.x = Math.PI / 2;
    this.threeJsScene.add(upLight);
};


TestScene.prototype.createNavGraph = function() {
    this.navGraph = [];
    
    // Create the navigation nodes.
    var node00 = new NavPoint(450, 0, 450);
    var node01 = new NavPoint(450, 0, 225);
    var node02 = new NavPoint(450, 0, 0);
    var node03 = new NavPoint(450, 0, -225);
    var node04 = new NavPoint(450, 0, -450);
    var node10 = new NavPoint(225, 0, 450);
    //var node11 = new NavPoint(225, 0, 225);
    var node12 = new NavPoint(225, 0, 0);
    var node13 = new NavPoint(225, 0, -225);
    var node14 = new NavPoint(225, 0, -450);
    var node20 = new NavPoint(0, 0, 450);
    var node21 = new NavPoint(0, 0, 225);
    var node22 = new NavPoint(0, 0, 0);
    var node23 = new NavPoint(0, 0, -225);
    var node24 = new NavPoint(0, 0, -450);
    var node30 = new NavPoint(-225, 0, 450);
    var node31 = new NavPoint(-225, 0, 225);
    var node32 = new NavPoint(-225, 0, 0);
    var node33 = new NavPoint(-225, 0, -225);
    var node34 = new NavPoint(-225, 0, -450);
    var node40 = new NavPoint(-450, 0, 450);
    var node44 = new NavPoint(-450, 0, -450);
    
    // Create the navigation graph.
    node00.next.push(node10, node10, node01);
    node01.next.push(node00, node10, node12, node02);
    node02.next.push(node01, node12, node13, node03);
    node03.next.push(node02, node12, node13, node14, node04);
    node04.next.push(node03, node13, node14);
    node10.next.push(node20, node21, node01, node00);
   // node11.next.push(node10, node20, node21, node22, node12, node02, node01, node00);
    node12.next.push(node21, node22, node23, node13, node03, node02, node01);
    node13.next.push(node12, node22, node23, node24, node14, node04, node03, node02);
    node14.next.push(node13, node23, node24, node04, node03);
    node20.next.push(node30, node31, node21, node10);
    node21.next.push(node20, node30, node31, node32, node22, node12, node10);
    node22.next.push(node21, node31, node32, node33, node23, node13, node12);
    node23.next.push(node22, node32, node33, node34, node24, node14, node13, node12);
    node24.next.push(node23, node33, node34, node14, node13);
    node30.next.push(node40, node31, node21, node20);
    node31.next.push(node30, node40, node32, node22, node21, node20);
    node32.next.push(node31, node33, node23, node22, node21);
    node33.next.push(node32, node44, node34, node24, node23, node22);
    node34.next.push(node33, node44, node24, node23);
    node40.next.push(node31, node30);
    node44.next.push(node34, node33);
    
    // Save the nodes.
    this.navGraph.push(node00, node01, node02, node03, node04);
    this.navGraph.push(node10, node12, node13, node14);
    this.navGraph.push(node20, node21, node22, node23, node24);
    this.navGraph.push(node30, node31, node32, node33, node34);
    this.navGraph.push(node40, node44);
};
