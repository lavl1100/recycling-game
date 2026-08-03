//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg, catcherImg, fallingObjectImg;

/* PRELOAD LOADS FILES */
function preload(){
  backgroundImg = loadImage("assets/background.jpg");
  catcherImg = loadImage("assets/catcher.png");
  fallingObjectImg = loadImage("assets/object.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  backgroundImg.resize(600,400);
  catcherImg.resize(100,110);
  fallingObjectImg.resize(55,40);
  
  //Create catcher 
  catcher = new Sprite(catcherImg, 200,380,100,110,"k");
  catcher.color = color(95,158,160);
  
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg,100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;
}

/* DRAW LOOP REPEATS */
function draw() {
  background(224,224,224);

  //Draw background image
  image(backgroundImg, 0, 0);
  
  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Move the \ncatcher with the \nleft and right \narrow keys to \ncatch the falling \nobjects.", width-100, 20);
  
  //If fallingObject reaches bottom, move back to top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
    score = score - 1;
  }

  //Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }

  //Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50
  } else if (catcher.x > 350) {
    catcher.x = 350
  }

  //If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
    fallingObject.direction = "down";
    score = score + 1;
  }

  //Keeps track of score
  textSize(20);
  text("Score = " + score, 10, 30);

  if (score < 0) {
    catcher.moveTo(1,-200,1000);
    fallingObject.moveTo(1,-300,1000);
    background(224,224,224);
    textSize(40);
    text("You Lose!",110,180);
    textSize(20);
    text("Play again?",150,220);
    if (mouse.pressed()) {
      restart()
    }
  } else if (score >= 10) {
    catcher.moveTo(1,-200,1000);
    fallingObject.moveTo(1,-300,1000);
    background(224,224,224);
    textSize(40);
    text("You Win!",120,180);
    textSize(20);
    text("Play again?",150,220);
    if (mouse.pressed()) {
      restart()
    }
  }

  function restart() {
    score = 0
    catcher.moveTo(200,380,1000);
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
    fallingObject.direction = "down";
  }

  allSprites.debug = mouse.pressing();
}