import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';
import Emitter from './lib/Emitter';
import Circle from './lib/Circle';
import AudioW from './lib/Audio'
import Stats from 'stats-js'


class App {

  constructor() {

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene = new Scene();
    this.audio = new AudioW('/audio/foals.mp3');

    let root = document.body.querySelector('.app');
    root.appendChild(this.scene.renderer.view);

    this.audioDataEl = 100;

    this.emmiter = new Emitter(this.scene, this.audioDataEl);
    this.circle = new Circle(this.scene);
    this.scene.addChild(this.circle);

    this.addListeners();

    this.statsReady = false;
    this.addStats();
    
  }

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
   * addListeners
   */
  addListeners() {

    window.addEventListener('resize', this.onResize.bind(this));
    TweenMax.ticker.addEventListener('tick', this.update.bind(this));
  }

  /**
   * update
   * - Triggered on every TweenMax tick
   */
  update() {
    if(this.statsReady) 
      this.stats.begin();

    this.DELTA_TIME = Date.now() - this.LAST_TIME;
    this.LAST_TIME = Date.now();

    const audioData = this.audio.getFrequencyBars(this.audioDataEl, 400);

    this.emmiter.update(this.DELTA_TIME, audioData);
    this.circle.update(this.DELTA_TIME, audioData[10]);
    
    this.scene.render();

    if(this.statsReady)
      this.stats.end();
    
  }

  /**
   * onResize
   * - Triggered when window is resized
   * @param  {obj} evt
   */
  onResize( evt ) {

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene.resize(this.width, this.height);
  }

}

export default App;
