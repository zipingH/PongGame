// import GameObject from './gameObject.js';
class GameObject{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
    }
}

export default class Net extends GameObject{
    constructor(x, y, width, height, color){
        super(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
      }
  }