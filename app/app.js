import Scene from './scene/scene';
import AudioW from './lib/Audio'
import NumberUtils from './utils/number-utils';
import RingEmitter from './lib/particules-emitter/RingEmitter';
import SmokeEmitter from './lib/particules-emitter/SmokeEmitter';
import LineEmitter from './lib/particules-emitter/LineEmitter';
import OctogoneEmitter from './lib/particules-emitter/OctogoneEmitter';
import Stars from './lib/Stars';


// Only dev
import Dat from 'dat-gui';
import Stats from 'stats-js';


class App {

    /**
     * @constructor
     */
    constructor() {

        this.ENV = 'DEV';

        // Calculate time
        this.DELTA_TIME = 0;
        this.LAST_TIME = Date.now();

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // Init base classes
        this.scene = new Scene();
        this.audio = new AudioW('/audio/Ueno.mp3');

        // Render pixi view
        let root = document.body.querySelector('.app');
        root.appendChild(this.scene.renderer.view);

        // Child of scene
        this.smokeEmitter = new SmokeEmitter(this.scene, 50);
        this.lineEmitter = new LineEmitter(this.scene, 50);
        this.ringEmitter = new RingEmitter(this.scene);
        this.octogoneEmitter = new OctogoneEmitter(this.scene);
        this.stars = new Stars(this.scene);


        // Add in scene
        this.scene.addChild(this.stars);

        this.addListeners();

        this.statsReady = false;

        // Init dev tools
        if(this.ENV === 'DEV') {
          this.addStats();
          this.addGui();
        }
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
        this.gui.add(this.audio.audioEl, 'currentTime').min(0).max(240).step(10).name('go to time');
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

        // Get audio data
        const audioData = this.audio.getFrequencyBars(50, 400);
        const averageAudioData = this.audio.getAverageFrequency();

        // Update children
        this.ringEmitter.update(this.DELTA_TIME, audioData[30]);
        this.smokeEmitter.update(this.DELTA_TIME, audioData[30]);
        this.lineEmitter.update(this.DELTA_TIME, audioData[10]);
        this.octogoneEmitter.update(this.DELTA_TIME, audioData[1]);

        this.stars.update(averageAudioData);

        // Render
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
