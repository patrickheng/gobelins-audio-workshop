    export default class AudioAnalyzer {

    /**
     * @constructor
     * @param {string} soundUrl - Url of the audio source
     */
    constructor(soundUrl) {
        this.audioEl = new Audio();
        this.audioEl.controls = false;
        this.audioEl.crossOrigin = "anonymous";
        this.audioEl.loop = true;
        this.audioEl.autoplay = true;

        this.soundUrl = soundUrl;
        this.audioEl.src = this.soundUrl;
        this.audioEl.pause();

        // Add can play through
        this.audioEl.addEventListener('canplaythrough', this.canPlayThrough.bind(this));

        this.audioCtx = new AudioContext();
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

    }

    /**
     * @name loadSound
     * @method
     * @description Load the audio source asynchroniously
     */
    canPlayThrough() {

        // Connected audio pipe
        this.audioSource = this.audioCtx.createMediaElementSource(this.audioEl);

        this.audioSource.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);

        this.soundLoaded = true;

        // Play the song
        this.audioEl.play();
    }

    /**
     * @method
     * @name getFrequencyData
     * @description Get data of the sound which is playing
     * @return {array} - Frenquency data array
     */
    getFrequencyData() {
        if (this.soundLoaded) {
            this.analyser.getByteFrequencyData(this.frequencyData);
        }
        return this.frequencyData;
    }

    /**
     * @method
     * @name getAverageFrequency
     * @description Get the average frequency with poundaration of each frequency
     * @return {float} - Frenquency average
     */
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

    /**
     * @name getFrequencyBars
     * @description Get an array of data of the sound currently playing sliced and recalculated value
     * @method
     * @param {integer} nbfOfBars - Numbers of index return
     * @param {integer} sliceN -  Offset from end, index to be ignore of returned array
     * @return {array} - Frenquency data array
     */
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
        result = result.map((list) => {
            let len = list.length;
            let total = list.reduce((prevVal, currentVal, index, array) => {
                return prevVal + currentVal;
            }, 0);
            return total / len;
        });

        return result;
    }
};
