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

        this.state = 'INTRO_START';

        EventEmitter.once('INTRO_END', this.onIntroEnds.bind(this));
    }

    /**
     * @method
     * @name onIntroEnds
     * @description Callback after receive INTRO_END event from Timeline class
     */
    onIntroEnds() {
        console.log('INTRO_END receive by LineEmitter');

        this.popFrequency = 1;
        this.thrownElements = 1;
        this.throw(30)
        this.state = 'INTRO_END';
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
            }
            this.particles[i].update(dt, audioData, this.state);
        }
    }
}
