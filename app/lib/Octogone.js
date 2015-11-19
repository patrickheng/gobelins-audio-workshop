import { Sprite } from 'pixi.js';
import NumberUtils from '../utils/number-utils';


export default class Octogone extends Sprite {

    /**
     * @constructor 
     * @param {object} options - Options of the particule
     */
    constructor(options) {
        super();

        this.baseLife = NumberUtils.randomRange(100, 300);
        this.life = this.baseLife;

        this.isDead = false;

        this.alpha = 0.2;

        this.x = NumberUtils.randomRange(0, window.innerWidth);
        
        this.y = NumberUtils.randomRange(0, window.innerHeight);

        this.scaleVal = 0;

        this.tint = 0xFDFDFD;

        this.texture = PIXI.Texture.fromImage('img/octogone.png');

    }

    /**
     * @method
     * @name reset
     * @description Reset a particule, used after use a old particule from pool
     */
    reset() {
        this.baseLife = NumberUtils.randomRange(100, 300);
        this.life = this.baseLife;
        this.isDead = false;

        this.scaleVal = 0;

        this.angle = NumberUtils.randomRange(-Math.PI, Math.PI);
        this.x = NumberUtils.randomRange(0, window.innerWidth);
        this.y = NumberUtils.randomRange(0, window.innerHeight);
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

        this.scaleVal += 0.015;
        this.scale.set(this.scaleVal); 
        this.life -= dt;
        this.alpha = 1 - this.life / 300;
    }

}
