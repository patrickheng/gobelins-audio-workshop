import {Sprite} from 'pixi.js';
import NumberUtils from '../utils/number-utils';


export default class Triangle extends Sprite {

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
            x: NumberUtils.randomRange(-10, 10),
            y: NumberUtils.randomRange(-10, 10)
        };

        this.x = Math.cos(this.angle) * 100 + window.innerWidth / 2;
        this.y = Math.sin(this.angle) * 100 + window.innerHeight / 2;
        this.alpha = 0;
        this.scaleVal = 0;
        this.rotation = this.angle;
        this.texture = PIXI.Texture.fromImage('img/triangle.png');
    }

    /**
     * @method
     * @name reset
     * @description Reset a particule, used after use a old particule from pool
     * @param {object} velocity - X/Y velocity
     */
    reset() {
        this.baseLife = NumberUtils.randomRange(1000, 3000);
        this.life = this.baseLife;
        this.isDead = false;

        this.scaleVal = 0;
        this.rotationSpeed = 0.01;
        this.alpha = 0;

        this.angle = NumberUtils.randomRange(-Math.PI, Math.PI);
        this.x = Math.cos(this.angle) * 100 + window.innerWidth / 2;
        this.y = Math.sin(this.angle) * 100 + window.innerHeight / 2;
    }

    /**
     * @method
     * @name update
     * @description Update called by a request animation frame
     * @param {float} dt - Delta time between two update
     * @param {float} audioData - Audio data senf from emitter
     */
    update(dt, audioData) {

        if(audioData > 100) {
            this.scaleVal = audioData / 100;
        } else {
            this.scaleVal = audioData / 200;
            this.alpha = 1 - this.life / this.baseLife - 0.4;
        }

        if (this.life < 0.2) {
            this.isDead = true;
            return;
        }

        this.scale.set(this.scaleVal);
        this.life -= dt;
        this.alpha = 1 - this.life / this.baseLife - 0.7;
        this.rotation += this.rotationSpeed;


    }

}
