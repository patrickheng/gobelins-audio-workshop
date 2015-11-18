import {
    Graphics, Sprite
}
from 'pixi.js';
import NumberUtils from '../utils/number-utils';


export default class Smoke extends Sprite {

    /**
     * @constructor 
     * @param {object} options - Options of the particule
     */
    constructor(options) {
        super();

        this.angle = NumberUtils.randomRange(-Math.PI, Math.PI);

        this.baseLife = NumberUtils.randomRange(1000, 3000);
        this.life = this.baseLife;

        this.isDead = false;

        this.velocity = {
            x: NumberUtils.randomRange(-3, 3),
            y: NumberUtils.randomRange(-3, 3)
        };

        this.textures = ['img/cloud700.png', 'img/line.png']

        this.x = Math.cos(this.angle) * 100 + window.innerWidth / 2;
        this.y = Math.sin(this.angle) * 100 + window.innerHeight / 2;

        this.scaleVal = 0;
        this.rotation = this.angle;
        // this.blendMode = PIXI.BLEND_MODES.ADD;
        this.alpha = 0.8;
        // this.tint = Math.random() * 0xFFFFFF;

        this.texture = PIXI.Texture.fromImage(this.textures[Math.floor(Math.random() * this.textures.length)]);
    }

    /**
     * @method
     * @name reset
     * @description Reset a particule, used after use a old particule from pool
     * @param {object} velocity - X/Y velocity
     */
    reset(velocity) {
        this.baseLife = NumberUtils.randomRange(1000, 3000);
        this.life = this.baseLife;
        this.isDead = false;

        this.scaleVal = 0;

        this.angle = NumberUtils.randomRange(-Math.PI, Math.PI);
        this.x = Math.cos(this.angle) * 100 + window.innerWidth / 2;
        this.y = Math.sin(this.angle) * 100 + window.innerHeight / 2;


        this.velocity = {
            x: velocity.x,
            y: velocity.y
        };

    }

    /**
     * @method
     * @name reset
     * @description Update called by a request animation frame
     * @param {float} dt - Delta time between two update
     * @param {float} audioData - Audio data senf from emitter
     */
    update(dt, audioData) {

        if (this.life < 0.2) {
            this.isDead = true;
            return;
        }
        this.life -= dt;

        this.x = Math.cos(this.angle) * 100 + window.innerWidth / 2 + this.velocity.x;
        this.y += this.velocity.y;

        this.alpha = 1 - this.life / this.baseLife - 0.3;
        this.scaleVal = audioData / 60;
        this.scale.set(this.scaleVal);

    }

}
