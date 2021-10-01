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
var net = new Net(0, canvas.height/2 - 2/2, 10, 2, "black");
// (x, y, radius, color)
var ball = new Ball(canvas.width/2, canvas.height/2, 15, "black");
 //(x, y, width, height, color, score)
var paddle_width = 100;
var paddle_height = 10;
var user = new User(canvas.width/2 - paddle_width/ 2, canvas.height - (paddle_height + 10), paddle_width, paddle_height, "blue", 0);
var bot = new Bot(canvas.width/2 - paddle_width/2, 10, paddle_width, paddle_height, "red", 0);


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

function drawBoard(){
   drawRect(0, 0, 400, 600, "white");  
}


function drawNet(){
  //increment i by 15px for net
  for(let i = 0; i < canvas.width; i+= 15 ){
    drawRect(net.x + i, net.y, net.width, net.height, net.color);
  }
}

function drawBall(){
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function drawPlayer(){
  // draws user and bot
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(bot.x, bot.y, bot.width, bot.height, bot.color);
}

function drawScore(){
  //draw the Score
  drawText(user.score, canvas.width/2 - 20, canvas.height/2 + (75 + 75), "Blue");
  drawText(bot.score, canvas.width/2 - 20, canvas.height/2 - 75, "red");
}

//render to create movements
function render() {
  drawBoard();
  drawScore();
  drawNet();
  drawPlayer();
  drawBall();
}

function update(){

}


function game(){
  update();
  render();
}
const framePerSecond = 60;
//call game(); 60times every 1000ms = 1sec
setInterval(game, 1000/framePerSecond); 



console.log(ball);
console.log(net);
console.log(user);
console.log(bot);
