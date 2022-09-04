// circle variables
let xCircle = 300;
let yCircle = 200;
let diameter = 13;
let radius = diameter / 2;

// circle speed
let speedXCircle = 6;
let speedYCircle = 6;

//racket variables
let xRacket = 5;
let yRacket = 150;
let wRacket = 10;
let hRacket = 90;

//opponent's racket variables
let xRacketOpponent = 585;
let yRacketOpponent = 150;
let SpeedYOpponent;

let hit = false;

//scoreboard
let opponentScore = 0;
let myScore = 0;

//sounds
let racketSound;
let backgroundSound;
let pointSound;

function preload() {
  backgroundSound = loadSound("trilha.mp3");
  pointSound = loadSound("ponto.mp3");
  racketSound = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  backgroundSound.loop();
}

function draw() {
  background(0);
  showCircle();
  moveCircle();
  verifyEdgeCollision();
  showRacket(xRacket, yRacket);
  moveMyRacket();
  verifyCollisionRacket(xRacket, yRacket);
  showRacket(xRacketOpponent, yRacketOpponent);
  moveRacketOpponent();
  verifyCollisionRacket(xRacketOpponent, yRacketOpponent);
  includeScore();
  scorePoint();
  circleDoNotStuck();
}

function showCircle() {
  circle(xCircle, yCircle, diameter);
}

function moveCircle() {
  xCircle += speedXCircle;
  yCircle += speedYCircle;
}

function verifyEdgeCollision() {
   if (xCircle + radius > width || xCircle - radius < 0){
    speedXCircle *= -1;
  }
  if (yCircle + radius > height || yCircle - radius < 0) {
    speedYCircle *= -1;
  }
}

function showRacket(x, y) {
  rect(x, y, wRacket, hRacket);
}

function moveMyRacket() {
  if (keyIsDown(UP_ARROW)){
    yRacket -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    yRacket += 10;
  }
}

function verifyCollisionRacket() {
  if (xCircle - radius < xRacket + wRacket && yCircle - radius < yRacket + hRacket && yCircle + radius > yRacket){
    speedXCircle *= -1;
    racketSound.play();
  }
}

function verifyCollisionRacket(x, y){
  collided =
  collideRectCircle(x, y, wRacket, hRacket, xCircle, yCircle, radius);
  if (collided){
    speedXCircle *= -1;
    racketSound.play();
  }
}

function moveRacketOpponent(){
   if (keyIsDown(87)){
    yRacketOpponent -= 10;
  }
  
  if (keyIsDown(83)){
    yRacketOpponent += 10;
  }
}

function includeScore(score, x, y) {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(myScore, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(opponentScore, 470, 26);
}
function scorePoint() {
  if (xCircle > 590){
    myScore += 1;
    pointSound.play();
  }
  if (xCircle < 10){
    opponentScore +=1;
    pointSound.play();
  }
}
function circleDoNotStuck(){
    if (xCircle - radius < 0){
    xCircle = 23;
    }
}
