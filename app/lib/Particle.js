import { Graphics, Sprite } from 'pixi.js';
import NumberUtils from '../utils/number-utils';


export default class Particule extends Sprite {

  constructor(options) {
    super();

    this.angle = NumberUtils.randomRange(-Math.PI,Math.PI);

    this.baseLife = NumberUtils.randomRange(1000, 3000);
    this.life = this.baseLife;

    this.isDead = false;

    this.velocity = {
      x: options.velocity.x,
      y: options.velocity.y
    };

    this.textures = ['img/line.png']

    this.x = Math.cos(this.angle) * 100 + window.innerWidth/2;
    this.y = Math.sin(this.angle) * 100 + window.innerHeight/2;

    this.scaleVal = 0;
    this.rotation = this.angle;
    // this.blendMode = PIXI.BLEND_MODES.ADD;
    this.alpha = 0.8;
    // this.tint = Math.random() * 0xFFFFFF;

    this.texture = PIXI.Texture.fromImage(this.textures[Math.floor(Math.random()*this.textures.length)]);
  }

  reset(velocity) {
    this.baseLife = NumberUtils.randomRange(1000, 3000);
    this.life = this.baseLife;
    this.isDead = false;

    this.scaleVal = 0;

    this.angle = NumberUtils.randomRange(-Math.PI,Math.PI);
    this.x = Math.cos(this.angle)*100 + window.innerWidth/2;
    this.y = Math.sin(this.angle)*100 + window.innerHeight/2;
    

    this.velocity = {
      x: velocity.x,
      y: velocity.y
    };

  }

  update(dt, audioData) {
      
      if(this.life < 0.2) {
        this.isDead = true;
        return;
      }
      this.life -= dt;
      
      this.x = Math.cos(this.angle)*100 + window.innerWidth/2 + this.velocity.x;
      this.y += this.velocity.y;

      this.alpha = 1 - this.life / this.baseLife - 0.3;
      this.scaleVal = audioData / 60;
      this.scale.set(this.scaleVal);


  }

}
