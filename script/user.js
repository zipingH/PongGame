import GameObject from './gameObject.js';

export default class User extends GameObject{
  constructor(x, y, width, height, color, score){
    super(x, y, width, height, color)
    this.score = score;
  }
}