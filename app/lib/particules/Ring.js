import { Sprite } from 'pixi.js';
import NumberUtils from '../../utils/number-utils';

export default class Ring extends Sprite {

    /**
     * @constructor
     * @param {object} options - Options of the particule
     */
    constructor(options) {
        super();

        this.baseLife = NumberUtils.randomRange(200, 1000);
        this.life = this.baseLife;

        this.isDead = false;

        this.velocity = {
            x: NumberUtils.randomRange(-3, 3),
            y: NumberUtils.randomRange(-3, 3)
        };

        this.x = NumberUtils.randomRange(0, window.innerWidth);

        this.y = NumberUtils.randomRange(0, window.innerHeight);

        this.scaleVal = 0;

        this.texture = PIXI.Texture.fromImage('img/circle-thin.png');

        this.blendMode = PIXI.BLEND_MODES.ADD;
    }

    /**
     * @method
     * @name reset
     * @description Reset a particule, used after use a old particule from pool
     */
    reset() {
        this.baseLife = NumberUtils.randomRange(100, 3000);
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
        // Set dead particule when life is not enough
        if (this.life < 0.2) {
            this.isDead = true;
            return;
        }

        // Change color depending on audioData value
        if(audioData < 100) {
            this.tint = 0x1abc9c;
        } else {
            this.tint = 0x1abc9c;
        }

        this.scaleVal += 0.005 ;
        this.scale.set(this.scaleVal);
        this.life -= dt;
        this.alpha = 1.3 - this.life / 300;
    }

}
