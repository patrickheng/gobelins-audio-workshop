import Dat from 'dat-gui';
import Scene from './scene/scene';
import AudioW from './lib/Audio'
import {
    Graphics
}
from 'pixi.js';
import NumberUtils from './utils/number-utils';
import SmokeEmitter from './lib/SmokeEmitter';
import Circle from './lib/Circle';
import Stats from 'stats-js'


class App {

    /**
     * @constructor 
     */
    constructor() {

        this.DELTA_TIME = 0;
        this.LAST_TIME = Date.now();

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new Scene();
        this.audio = new AudioW('/audio/Ueno.mp3');
        this.audioIndex = 10;

        let root = document.body.querySelector('.app');
        root.appendChild(this.scene.renderer.view);

        this.audioDataEl = 100;

        this.smokeEmitter = new SmokeEmitter(this.scene, this.audioDataEl);
        this.circle = new Circle(this.scene);
        this.scene.addChild(this.circle);

        this.addListeners();

        this.statsReady = false;
        this.addStats();
        this.addGui();

    }

    /**
     * @method
     * @name addStats
     * @description Init stats.js
     */
    addStats() {
        //Stats js
        this.stats = new Stats();
        this.stats.setMode(0);

        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        this.statsReady = true;

        document.body.appendChild(this.stats.domElement);
    }

    /**
     * @method
     * @name addGui
     * @description Init dat.gui.js
     */
    addGui() {
        this.gui = new Dat.GUI();
        this.gui.add(this, 'audioIndex').min(1).max(300);
    }

    /**
     * @method
     * @name addListeners
     * @description Add event listener
     */
    addListeners() {

        window.addEventListener('resize', this.onResize.bind(this));
        TweenMax.ticker.addEventListener('tick', this.update.bind(this));
    }

    /**
     * @method
     * @name update
     * @description Update
     */
    update() {
        if (this.statsReady)
            this.stats.begin();

        this.DELTA_TIME = Date.now() - this.LAST_TIME;
        this.LAST_TIME = Date.now();

        const audioData = this.audio.getFrequencyBars(this.audioDataEl, 400);

        this.smokeEmitter.update(this.DELTA_TIME, audioData);
        this.circle.update(this.DELTA_TIME, audioData[this.audioIndex]);

        this.scene.render();

        if (this.statsReady)
            this.stats.end();

    }

    /**
     * @method
     * @name onResize
     * @description Triggered when window is resized
     * @param {object} evt
     */
    onResize(evt) {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene.resize(this.width, this.height);
    }

}

export default App;
