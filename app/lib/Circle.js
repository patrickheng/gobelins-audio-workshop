import { Graphics, Sprite } from 'pixi.js';
import NumberUtils from '../utils/number-utils';

const fl = 250;
const vpX = window.innerWidth / 2;
const vpY = window.innerHeight / 2;

export default class Circle extends Graphics {
  constructor(scene) {
    super();

    this.scene = scene;
    this.drawPos = {
      x: 0,
      y: window.innerHeight/2,
    }
    this.velocity = 0.5;
    
    // this.texture = PIXI.Texture.fromImage('img/star.png');

  }

  throw(number) {

  }

  update(dt, audioData) {
    this.clear();
    for (let i = 0; i < 100; i++) {

      this.beginFill(0xa66bbe, 0.2);
      this.drawCircle(NumberUtils.randomRange(-window.innerWidth, window.innerWidth),  NumberUtils.randomRange(-window.innerHeight, window.innerHeight), 5);
      
    };
  }
}
