var bg_1I,bg_2I;
var ground;
var gameState = 0;
var hero;
var s_mon;
var bg1;
var hero_idleI,hero_walk,hero_jmup;
var mons1,mons2;
var monsGroup1,monsGroup2;
var h1,h2,h3,h4,h5,h6;
var h1I,h2I,h3I,h4I,h5I,h6I;
var hit;
var monI;
var hFlag = 0;
var l1Score = 0;
var attack = 0;


function preload() {
  bg_1I = loadImage("bg_1.jpg");
  bg_2I = loadImage("bg_1b.jpg");
  hero_idleI = loadAnimation("idle.png");
  hero_jump = loadAnimation("jP.png");
  hit = loadAnimation("aT.png","aT2.png","aT3.png","aT4.png");
  monI = loadAnimation("r1.png","r2.png","r3.png","r4.png","r5.png");
  h1I = loadImage("h1.png");
  h2I = loadImage("h2.png");
  //hero_walk = loadAnimation("walk1.png","walk2.png");
}
function setup() {
  createCanvas(displayWidth, 800);
  bg1 = createSprite(displayWidth/2,400,displayWidth,800);
  bg1.scale = 2.5;
  bg1.addImage(bg_1I);
  ground = createSprite(displayWidth/2,750,displayWidth,20);
  hero = createSprite(100,690,20,50);
  hero.scale = 1.5;
  hero.addAnimation("idle",hero_idleI);
  //hero.addAnimation("walk",hero_walk);
  hero.addAnimation("jump",hero_jump);
  hero.addAnimation("hit",hit);

  h1 = createSprite(70,50,20,20);
  h1.addImage(h2I);
  h1.scale = 0.2;

  h2 = createSprite(100,50,20,20);
  h2.addImage(h1I);
  h2.scale = 0.2;

  h3= createSprite(140,50,20,20);
  h3.addImage(h2I);
  h3.scale = 0.2;

  h4 = createSprite(170,50,20,20);
  h4.addImage(h1I);
  h4.scale = 0.2;

  h5= createSprite(210,50,20,20);
  h5.addImage(h2I);
  h5.scale = 0.2;

  h6 = createSprite(240,50,20,20);
  h6.addImage(h1I);
  h6.scale = 0.2;



  monsGroup1 = new Group();
  monsGroup2 = new Group();
  //console.log(displayWidth);
}
function draw() {
  background("black");

  
  if (gameState === 0){
    background(bg_2I)
    fill("black");
    stroke("grey");
    textFont("antrophobia ");
    textSize(18);
    text("THE CONTROL OF THE GAME ARE AND THE STROY IS",520,200);
    textSize(20);
    text("A LONG BACK AGO , IN A BEAUTIFUL VILLAGE THERE WAS A ATTACK A MONSTER. THE MONSTER HAD DESTROYED THE WHOLE VILLAGE",50,250);
    text("THE MONSTER HAD DEMANDS THAT EVERY WEEK HE WILL COME AND TAKE FOODS OTHERWISE HE WILL TAKE A VILLAGER WITH HIMSELF. ",50,280);
    text("SO ONE OF A PERSON TAKES INITIATIVE TO DEFEAT THAT MONSTER THAT FREE HIS VILLAGE FROM THAT MONSTER ",50,310);
    textSize(25);
    text("PRESS 'ENTER BUTTON' TO START ",500,400);
    
    //console.log("hi");
    ground.visible = false;
    hero.visible = false;
    bg1.visible=false;
    if(keyDown("enter")){
      //console.log("runit");
      gameState = 1;
    }
  }
  if(gameState === 1){
    background("blue");
    textSize(20);
    fill("black");
    
    bg1.visible=true;
    

    ground.visible = true;
  
  
    hero.visible = true;
    var rand = Math.round(random(1,2));
    if(rand === 1){
      spawnMonBig();
    }
    else if(rand === 2){
      spawnMonSmall()
    }
    if(monsGroup1.isTouching(hero) && attack === 1){
      monsGroup1.destroyEach()
      l1Score += 1;
    }
    if(monsGroup1.isTouching(hero)){
      console.log(hFlag);
      if(hFlag === 0){
        h6.destroy();
        monsGroup1.destroyEach();
        //
      }
      else if(hFlag === 1){
        h5.destroy();
        monsGroup1.destroyEach();
        //hFlag += 1;
      }
      else if(hFlag === 2){
        h4.destroy();
        monsGroup1.destroyEach();
        //hFlag += 1;
      }
      else if(hFlag === 3){
        h3.destroy();
        monsGroup1.destroyEach();
        //hFlag += 1;
      }
      else if(hFlag === 4){
        h2.destroy();
        monsGroup1.destroyEach();
        //hFlag += 1;
      }
      else if(hFlag === 5){
        h1.destroy();
        monsGroup1.destroyEach();
        //hFlag += 1;
      }


      hFlag += 1;
      console.log("udpate"+hFlag);
      //monsGroup1.setLifetimeEach(-1);
    }
    if(hFlag >5){
      gameState = 0;

    }
    if(l1Score >1){
      gameState = 2;
    }
    
  }

  if(gameState === 2){
    background("black");
    bg1.destroy();
  }

 

  


  if(keyWentDown("W")){
   
    hero.changeAnimation("jump",hero_jump);
    hero.velocityY = -12;
  }

  if(keyWentUp("W")   ){
    hero.changeAnimation("idle",hero_idleI);
  }
  


  if(keyWentDown("space")){
    hero.changeAnimation("hit",hit); 
    attack = 1;
  }

  if(keyWentUp("space")){
    hero.changeAnimation("idle", hero_idleI);
    attack = 0;
  }
  
  hero.velocityY = hero.velocityY + 0.8;
  hero.collide(ground);
  
  drawSprites();
  text("SCORE : " + l1Score,800,50);
}

function spawnMonBig(){
  if(frameCount % 80 === 0){
    mons1 = createSprite(displayWidth+10,690,50,50);
    mons1.addAnimation("monster",monI);
    mons1.scale = 3;
    mons1.velocityX = -6;
    monsGroup1.add(mons1);
    mons1.lifetime = 250;
    
    
  }
}

function spawnMonSmall(){
  if(frameCount % 80 === 0){
    mons2 = createSprite(displayWidth+10,700,50,50);
    mons2.shapeColor = "red";
    mons2.velocityX = -6;
    monsGroup2.add(mons2);
    mons2.lifetime = 250;
    
    
  }
}