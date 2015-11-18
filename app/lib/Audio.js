export default class AudioAnalyzer {

  constructor(soundUrl) {
    this.audioCtx = new AudioContext();

    this.soundUrl = soundUrl;

    this.analyser = this.audioCtx.createAnalyser();

    this.analyser.smoothingTimeConstant = 0.9;
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    this.biquadFilter = this.audioCtx.createBiquadFilter();

    // All different node
    this.distortion = this.audioCtx.createWaveShaper();
    this.gainNode = this.audioCtx.createGain();
    this.convolver = this.audioCtx.createConvolver();

    this.soundLoaded = false;

    this.audioBuffer;
    this.audioSource;

    this.loadSound();
  }

  loadSound() {
    let request = new XMLHttpRequest();
    request.open('GET', this.soundUrl, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      this.soundLoaded = true;
      this.audioCtx.decodeAudioData(request.response, (buffer) => {
        // success callback
        this.audioBuffer = buffer;
        // Create sound from buffer
        this.audioSource = this.audioCtx.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;

        // Base
        this.audioSource.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);

        // play sound
        this.audioSource.start();
      }, function(){
        // error callback
      });
    }
    request.send();
  }

  getFrequencyData() {
    if (this.soundLoaded) {
      this.analyser.getByteFrequencyData(this.frequencyData);
    }
    return this.frequencyData;
  }

  getAverageFrequency() {

    let data = this.getFrequencyData();

    let total = 0;
    let pond = 0;

    for (let i = 0; i < data.length; i++) {
      total += i * data[i];
      pond += data[i];
    }

    const result = (pond) ? total / pond : 0;
    return result;
  }

  getFrequencyBars(nbfOfBars, sliceN) {

    let data = this.getFrequencyData();

    let sliceNb = sliceN || data.length;

    let freqByBar = sliceNb / nbfOfBars;

    let result = [];
    for (let i = 0; i < nbfOfBars; i++) {
      result[i] = [];
    }

    // Group
    for (let i = 0; i < sliceNb; i++) {
      let resultIndex = Math.floor(i / freqByBar);
      result[resultIndex].push(data[i])
    }

    // Reduce
    result = result.map( (list) => {
      let len = list.length;
      let total = list.reduce( (prevVal, currentVal, index, array) => {
        return prevVal + currentVal;
      }, 0);
      return total / len;
    });

    return result;
  }
};
