// import GameObject from './gameObject.js';
class GameObject{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

export default class Bot extends GameObject{
  constructor(x, y, width, height, color, score){
    super(x, y);
    this.width = width;
    this.height = height;
    this.color = color;
    this.score = score;
  }
}