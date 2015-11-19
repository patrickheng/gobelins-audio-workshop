import Constant from '../../config/constant';
import EmitterBase from './EmitterBase';
import EventEmitter from '../EventEmitter';
import Smoke from '../Smoke';
import NumberUtils from '../../utils/number-utils';

export default class SmokeEmitter extends EmitterBase {

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

        this.populate(Smoke, 1000);

        this.throw(this.particlesNumber);

        EventEmitter.once('INTRO_ENDS', this.onIntroEnds.bind(this));

        this.currentTime = 0;
    }

    /**
     * @method
     * @name onIntroEnds
     * @description Callback after receive INTRO_ENDS event from Timeline class
     */
    onIntroEnds() {
        this.throw(30);
        this.tintParticules();
    }

    /**
     * @method
     * @name tintPartiules
     * @description Set color to the current smoke
     * @param {integer} color - Tint color
     */
    tintPartiules(color) {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].tint = color;
        }
    }

    /**
     * @method
     * @name update
     * @description Update called by a request animation frame
     * @param {float} ct - CurentTime of the played soud
     * @param {float} dt - Delta time between two update
     * @param {float} audioData - Audio data senf from emitter
     */
    update(ct, dt, audioData) {
        // this.currentTime += dt;
        //
        // if(this.currentTime > 100) {
        //     this.currentTime = 0;
        // }

        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].isDead) {

                // Remove child
                this.scene.removeChild(this.particles[i]);

                // Take a new particules from pool
                this.particles[i] = this.takeFromPool();

                // Set new options of the particule
                const velocity = {
                    x: NumberUtils.randomRange(-3, 3),
                    y: NumberUtils.randomRange(-3, 3)
                }

                this.particles[i].reset(velocity);

                // Add the new particule in the scene
                this.scene.addChild(this.particles[i]);

            } else {
                this.particles[i].update(dt, audioData);
            }
        }
    }
}
