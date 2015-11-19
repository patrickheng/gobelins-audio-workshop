import EmitterBase from './EmitterBase';
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
    }

    /**
     * @method
     * @name throw
     * @description Instance particules
     * @param {integer} number - Number of thrown particules
     */
    throw(number) {
        for (let i = 0; i < number; i++) {

            const p = this.takeFromPool();

            this.particles.push(p);

            this.scene.addChild(p);
        }
    }

    /**
     * @method
     * @name reset
     * @description Update called by a request animation frame
     * @param {float} dt - Delta time between two update
     * @param {float} audioData - Audio data senf from emitter
     */
    update(dt, audioData) {
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
