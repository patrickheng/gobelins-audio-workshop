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
      introEnd: false,
      mainMelody: false,
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

    if(this.currentTime > Constant.INTRO_END && !this.flags.introEnd) {
      this.flags.introEnd = true;
      EventEmitter.emit('INTRO_END');
    }
    else if(this.currentTime > Constant.MAIN_MELODY && !this.flags.mainMelody) {
      this.flags.mainMelody = true;
      EventEmitter.emit('MAIN_MELODY');
    }

  }

}

export default Timeline;
