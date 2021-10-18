import User from './script/user.js';
import Bot from './script/bot.js';
import Net from './script/net.js';
import Ball from './script/ball.js';

// find the <canvas> element
const canvas = document.getElementById("pong");

// getContext() is a built-in HTML object, with properties and methods for drawing
const context = canvas.getContext("2d");

//create Objects
//(x, y, width, height, color)
var net = new Net(0, canvas.height / 2 - 2 / 2, 10, 2, "White");

// ball (x, y, radius, color, speed, velocityX, velocityY)
var ball = new Ball(canvas.width / 2, canvas.height / 2, 8, "White", 5, 5, 5);
//user (x, y, width, height, color, score)
var paddle_width = 70;
var paddle_height = 10;
var user = new User(canvas.width / 2 - paddle_width / 2, canvas.height - (paddle_height + 10), paddle_width, paddle_height, "blue", 0);
var bot = new Bot(canvas.width / 2 - paddle_width / 2, 10, paddle_width, paddle_height, "red", 0);


function drawRect(x, y, w, h, color) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = "75px fantasy";
  context.fillText(text, x, y);
}

function drawBoard() {
  drawRect(0, 0, canvas.width, canvas.height, "black");
}


function drawNet() {
  //increment i by 15px for net
  for (let i = 0; i < canvas.width; i += 15) {
    drawRect(net.x + i, net.y, net.width, net.height, net.color);
  }
}

function drawBall() {
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function drawPlayer() {
  // draws user and bot
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(bot.x, bot.y, bot.width, bot.height, bot.color);
}

function drawScore() {
  //draw the Score
  drawText(user.score, canvas.width / 2 - 20, canvas.height / 2 + (75 + 75), user.color);
  drawText(bot.score, canvas.width / 2 - 20, canvas.height / 2 - 75, bot.color);
}

function resetBall(){
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
  ball.speed = 5;
  //reset ball and goes to the opposite direction
  //winner serve the ball
  ball.velocityY = -ball.velocityY;
}


//checks for collisions between ball and players
function collision(b, p) {
  //user 
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;
  //ball
  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  // return true if collisions else false
  if (b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top) {
    // console.log("collison");
    return true;
  }
  return false;
}



//render to create movements
function render() {
  drawBoard();
  drawScore();
  drawNet();
  drawPlayer();
  drawBall();
}

//simple Ai to control bot paddle.
function bot_Controls(){
  let botLevel = 0.1;
  //bot paddle follows the ball
  let centerOfBotPaddle_To_Ball = (ball.x - (bot.x + bot.width/2));
  bot.x += centerOfBotPaddle_To_Ball * botLevel;
}

function update() {
  //move ball in the x direction.
  ball.x += ball.velocityX;
  //move ball in the y direction.
  ball.y += ball.velocityY;

  //simple Ai to control bot paddle.
  bot_Controls();

  // make sure the ball stays within the range/edges of the canvas width (0 to canvas.width) by going to the opposite directions.
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.velocityX = - ball.velocityX;
  }

  //check whether the bot or user will have collision with the ball.
  let player = (ball.y < canvas.height / 2) ? bot : user;

  if (collision(ball, player)) {
    // collidePoint - (user.x + user.width/2) this is the center of the paddle. Range from -1 to 1.
    //at center of the paddle, collidePoint is 0.
    let collidePoint = ball.x - (player.x + player.width / 2);
    collidePoint = collidePoint / (player.width / 2);
    // console.log(collidePoint);

    let angle_radians = collidePoint * (Math.PI / 4);
    
    let direction = (ball.y < canvas.height / 2) ? 1 : -1;
    //horizontal pong direction
    // ball.velocityX = ball.speed * Math.cos(angle_radians);
    // ball.velocityY = direction * ball.speed * Math.sin(angle_radians);
    
    // vertical pong direction
    ball.velocityX = ball.speed * Math.sin(angle_radians);
    ball.velocityY = direction * ball.speed * Math.cos(angle_radians);

    ball.speed += 0.1;
  }

  //update score for bot
  if(ball.y + ball.radius > canvas.height){
    bot.score++;
    resetBall();
  }
  //update score for user by checking the edges of canvas height.
  else if(ball.y - ball.radius < 0 ){
    user.score++;
    resetBall();
  }
}

//mouse movements
canvas.addEventListener("mousemove", movePaddle);
function movePaddle(event){
  //boundaries of canvas
  let rect = canvas.getBoundingClientRect();
  user.x = event.clientX - rect.left - user.width/2;
}

function game() {
  update();
  render();
}
const framePerSecond = 60;
//call game(); 60times every 1000ms = 1sec
setInterval(game, 1000 / framePerSecond);



// console.log(ball);
// console.log(net);
// console.log(user);
// console.log(bot);
