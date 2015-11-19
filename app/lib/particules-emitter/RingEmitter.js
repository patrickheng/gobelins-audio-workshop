import EmitterBase from './EmitterBase';
import Ring from '../Ring';
import NumberUtils from '../../utils/number-utils';

export default class RingEmitter extends EmitterBase {

    /**
     * @constructor
     * @inherits EmitterBase
     * @param {object} scene - The current scene of Pixi
     * @param {integer} particuleNb - Number of particule to be instancieted
     */
    constructor(scene, particuleNb) {
        super();

        this.scene = scene;
        this.particlesNumber = particuleNb;

        this.populate(Ring, 500);
        this.minTrigger = 100;
    }

    /**
     * @method
     * @name update
     * @description Update called by a request animation frame
     * @param {float} dt - Delta time between two update
     * @param {float} audioData - Audio data senf from emitter
     */
    update(dt, audioData) {

        if(audioData > this.minTrigger) {
            this.throw(1);
        }
        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].isDead) {

                // Remove child
                this.scene.removeChild(this.particles[i]);

                this.particles[i].reset();

            } else {


                this.particles[i].update(dt, audioData);
            }

        }
    }
}
