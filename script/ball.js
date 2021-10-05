class GameObject{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

export default class Ball extends GameObject{
    constructor(x, y, radius, color, speed, velocityX, velocityY){
        super(x, y);
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        //velocity is speed of a direction
        this.velocityX = velocityX;
        this.velocityY = velocityY;
      }
  }