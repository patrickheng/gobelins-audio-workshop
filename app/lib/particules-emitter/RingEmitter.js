import EmitterBase from './EmitterBase';
import Ring from '../particules/Ring';
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
        this.currentTime = 0;
        this.minTriggerAmp = 100;
        this.maxTick = 20;
    }

    /**
     * @method
     * @name update
     * @description Update called by a request animation frame
     * @param {float} dt - Delta time between two update
     * @param {float} audioData - Audio data senf from emitter
     */
    update(dt, audioData) {
        this.currentTime += dt;

        if(audioData > this.minTriggerAmp && this.currentTime > this.maxTick) {
            this.throw(1);
            this.currentTime = 0;
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
