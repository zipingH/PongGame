// import GameObject from './gameObject.js';
class GameObject{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

export default class User extends GameObject{
  constructor(x, y, width, height, color, score){
    super(x, y, width, height, color)
    this.score = score;
  }
}