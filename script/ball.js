class GameObject{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

export default class Ball extends GameObject{
    constructor(x, y, radius, color){
        super(x, y);
        this.radius = radius;
        this.color = color;
      }
  }