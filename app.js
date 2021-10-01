import User from './user.js';
import Bot from './bot.js';

// find the <canvas> element
const canvas = document.getElementById("pong");

// getContext() is a built-in HTML object, with properties and methods for drawing
const context = canvas.getContext("2d");

context.fillStyle = "black";
//(x, y, width, height)
context.fillRect(100, 200, 50, 75);

//draws the ball
context.fillStyle = "red"
//Begin first path of the ball
context.beginPath();
//(x, y, radius, start angle, end angle, direction), circle starts from 0 deg and ends at 360 deg (pi * 2).
//direction = false  -> drawn clockwise direction
context.arc(300, 350, 100, 0, Math.PI * 2)
context.closePath();
context.fill();


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

let rectX = 0;
// function render() {
//   drawRect(0, 0, 600, 400, "black");
//   drawRect(rectX, 100, 100, 100, "red");
//   rectX = rectX + 100;
// }
// //run render function every 1000 milliseconds = 1sec.
// setInterval(render, 1000);

//create net object
const net = {
  //center the net with x position
  x: canvas.width/2 - 2/2,
  y: 0,
  width: 2,
  height: 10,
  color: "WHITE"
};

function drawNet(){
  //increment i by 15px
  for(let i = 0; i < canvas.height; i+=15 ){
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}
// drawNet();








var p1Score = 0;
var p2Score = 0;
//(x, y, width, height, color, score)
var user = new User(0, canvas.height / 2 - 100 / 2, 10, 100, "black", p1Score);

var bot = new Bot(canvas.width - 10, canvas.height / 2 - 100 / 2, 100, "black", p2Score);
// console.log(user);
// console.log(user.height);

//draws user and bot
// drawRect(user.x, user.y, user.width, user.height, user.color);
// drawRect(bot.x,bot.y, bot.width, bot.height, bot.color);