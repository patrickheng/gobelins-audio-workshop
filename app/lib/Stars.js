import { Graphics } from 'pixi.js';
import NumberUtils from '../utils/number-utils';


export default class Stars extends Graphics {

    constructor(scene) {
        super();

        this.scene = scene;

        this.starsNumber = 120;

        this.velocity = 0.001;

        this.generateStars();
    }

    generateStars() {
        for (let i = 0; i < this.starsNumber; i++) {
            const x = NumberUtils.randomRange(-window.innerWidth, window.innerWidth);
            const y = NumberUtils.randomRange(-window.innerHeight, window.innerHeight);
            this.beginFill(0xFFFFFF, 0.2);
            this.drawCircle(x, y, 1);
        };
    }

    update(audioData) {
        this.alpha = audioData/10;
        this.rotation += this.velocity;
    }
}
