import Constant from '../config/constant';
import EventEmitter from './EventEmitter';

class Timeline {

  /**
   * @constructor
   * @param {object} audio - Audio source el
   */
  constructor(audio) {

    this.audio = audio;
    this.currentTime = audio.currentTime;

    // Select timecode
    this.timecode = document.getElementById('timecode');

    // Timeline flags
    this.flags = {
      introEnds: false,
    }


    // Add timeupdate listener
    audio.addEventListener("timeupdate", this.update.bind(this));
  }

  /**
   * @method
   * @description On time update of audio source
   */
  update() {

    this.currentTime = this.audio.currentTime;

    // Update timecode for debugging
    this.timecode.innerText = this.currentTime;

    if(this.currentTime > Constant.INTRO_ENDS && !this.flags.introEnds) {
      this.flags.introEnds = true;
      EventEmitter.emit('INTRO_ENDS');
    }

  }

}

export default Timeline;
