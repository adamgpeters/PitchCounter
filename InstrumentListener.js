// import PitchCounter from './PitchCounter.js'

class InstrumentListener {
    constructor(instrument) {
        this.pitchCounter = new PitchCounter();
        this.get_pitch_count = function () {
            return this.pitchCounter.counter; };
        this.changeInstrument(instrument);
    }

    startListener() {
        this.pitchCounter.initPitchCounting();
    }

    changeInstrument(instrument) {
        if (instrument.toLowerCase() == "piano") this.initPiano();
        else if (instrument.toLowerCase() == "voice") this.initVoice();
        else if (instrument.toLowerCase() == "guitar") this.initGuitar();
        else if (instrument.toLowerCase() == "percussion") this.initPercussion();
        else if (instrument.toLowerCase() == "strings") this.initStrings();
        else if (instrument.toLowerCase() == "winds") this.initWinds();
        else if (instrument.toLowerCase() == "brass") this.initBrass();
        else this.initDefault();
    }

    stopListener() {
        this.pitchCounter.stop();
        this.pitchCounter.counter = 0;
    }

    changeListenerState() {
        this.pitchCounter.changeState();
        return this.get_pitch_count();
    }

    createPeakRequirement(yInt, slope) {
        return function(x) {
            return slope * x + yInt;
        }
    }

    initPiano() {
        this.pitchCounter.minSNR = .5;
        this.pitchCounter.rememberedFrames = 3;
        this.pitchCounter.smoother = .03; //.05
        this.pitchCounter.simNoteThreshold = 1.8;
        this.pitchCounter.peakRequirement =
            this.createPeakRequirement(-75, -.25);
        this.pitchCounter.decibalConstant = 5;
        this.pitchCounter.bufferSize = 512;
        this.pitchCounter.silenceBuffer = 8;
        this.pitchCounter.framesOfQuiet = this.pitchCounter.silenceBuffer + 1;
        this.pitchCounter.noteBuffer = 5;
    }

    initVoice() {
        this.pitchCounter.minSNR = .5;
        this.pitchCounter.rememberedFrames = 3;
        this.pitchCounter.smoother = .4;
        this.pitchCounter.simNoteThreshold = 1.8;
        this.pitchCounter.peakRequirement =
            this.createPeakRequirement(-70, -.12);
        this.pitchCounter.decibalConstant = 7;
        this.pitchCounter.bufferSize = 2048;
        this.pitchCounter.silenceBuffer = 8;
        this.pitchCounter.framesOfQuiet = this.pitchCounter.silenceBuffer + 1;
    }

    //working
    initGuitar() {
        this.pitchCounter.minSNR = .1;
        this.pitchCounter.rememberedFrames = 4;
        this.pitchCounter.smoother = .6; //.6
        this.pitchCounter.simNoteThreshold = 2.5;
        this.pitchCounter.peakRequirement =
            this.createPeakRequirement(-85, -.15);
        this.pitchCounter.decibalConstant = 5;
        this.pitchCounter.bufferSize = 256;
        this.pitchCounter.silenceBuffer = 4;
        this.pitchCounter.framesOfQuiet = this.pitchCounter.silenceBuffer + 1;
        this.pitchCounter.noteBuffer = 10;
    }

    initPercussion() {
        this.pitchCounter.minSNR = .1;
        this.pitchCounter.rememberedFrames = 4;
        this.pitchCounter.smoother = .45;
        this.pitchCounter.simNoteThreshold = 4;
        this.pitchCounter.peakRequirement =
            this.createPeakRequirement(-90, -.11);
        this.pitchCounter.decibalConstant = 3;
        this.pitchCounter.bufferSize = 512;
        this.pitchCounter.silenceBuffer = 1;
        this.pitchCounter.framesOfQuiet = this.pitchCounter.silenceBuffer + 1;
    }

    //working
    initStrings() {
        this.pitchCounter.minSNR = .5;
        this.pitchCounter.rememberedFrames = 2;
        this.pitchCounter.smoother = .25; //1.5
        this.pitchCounter.simNoteThreshold = 1.7;
        this.pitchCounter.peakRequirement =
            this.createPeakRequirement(-60, -.1);
        this.pitchCounter.decibalConstant = 7;
        this.pitchCounter.bufferSize = 256;
        this.pitchCounter.silenceBuffer = 5; // decrease?
        this.pitchCounter.framesOfQuiet = this.pitchCounter.silenceBuffer + 1;
        this.pitchCounter.noteBuffer = 15;
    }

    initWinds() {
        this.pitchCounter.minSNR = .5;
        this.pitchCounter.rememberedFrames = 3;
        this.pitchCounter.smoother = .1;
        this.pitchCounter.simNoteThreshold = 1.8;
        this.pitchCounter.peakRequirement =
            this.createPeakRequirement(-70, -.10);
        this.pitchCounter.decibalConstant = 7;
        this.pitchCounter.bufferSize = 256;
        this.pitchCounter.silenceBuffer = 4;
        this.pitchCounter.framesOfQuiet = this.pitchCounter.silenceBuffer + 1;
    }

    initBrass() {
        this.pitchCounter.minSNR = .5;
        this.pitchCounter.rememberedFrames = 3;
        this.pitchCounter.smoother = .45;
        this.pitchCounter.simNoteThreshold = 1.7;
        this.pitchCounter.peakRequirement =
            this.createPeakRequirement(-55, -.1);
        this.pitchCounter.decibalConstant = 7;
        this.pitchCounter.bufferSize = 256;
        this.pitchCounter.silenceBuffer = 4; // decrease?
        this.pitchCounter.framesOfQuiet = this.pitchCounter.silenceBuffer + 1;
    }

    initDefault() {
        this.initVoice();
    }
}
//
// const instrumentListener = new InstrumentListener("default");
// module.exports = instrumentListener;
