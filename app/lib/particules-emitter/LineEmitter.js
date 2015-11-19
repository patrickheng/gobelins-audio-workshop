import Constant from '../../config/constant';
import EmitterBase from './EmitterBase';
import EventEmitter from '../EventEmitter';
import Line from '../Line';
import NumberUtils from '../../utils/number-utils';

export default class LineEmitter extends EmitterBase {

    /**
     * @constructor
     * @inherits EmitterBase
     * @param {object} scene - The current scene of Pixi
     * @param {integer} particuleNb - Particules thrown at init
     */
    constructor(scene, particuleNb) {
        super();

        this.scene = scene;
        this.particlesNumber = particuleNb;
        this.maximumValue = 100;

        this.populate(Line, 1000);

        this.popFrequency = 5;
        this.thrownElements = 2;

        this.throw(this.particlesNumber);

        this.currentTime = 0;

        EventEmitter.once('INTRO_ENDS', this.onIntroEnds.bind(this));
    }

    /**
     * @method
     * @name onIntroEnds
     * @description Callback after receive INTRO_ENDS event from Timeline class
     */
    onIntroEnds() {
        console.log('INTRO_ENDS receive by LineEmitter');

        this.popFrequency = 1;
        this.thrownElements = 3;
    }

    /**
     * @method
     * @name update
     * @description Update called by a request animation frame
     * @param {float} dt - Delta time between two update
     * @param {float} audioData - Audio data senf from emitter
     */
    update(ct, dt, audioData) {
        this.currentTime += 0.5;

        if(this.currentTime >= this.popFrequency) {
           this.currentTime = 0;
           this.throw(this.thrownElements);
       }

        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].isDead) {

                // Remove child
                this.scene.removeChild(this.particles[i]);
                this.particles.splice(i,1);
                // Take a new particules from pool
                // this.particles[i] = this.takeFromPool();

                // Set new options of the particule
                // const velocity = {
                //     x: NumberUtils.randomRange(-3, 3),
                //     y: NumberUtils.randomRange(-3, 3)
                // }

                // this.particles[i].reset(velocity);

                // Add the new particule in the scene
                // this.scene.addChild(this.particles[i]);


            }
                this.particles[i].update(dt, audioData);


        }
    }
}
