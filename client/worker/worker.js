importScripts('worker/lame.all.js');

const CHANNELS = 1;
const SAMPLE_RATE = 44100;
const KBPS = 128;

class Converter {

    constructor() {
        this.output = [];
        this.mp3encoder = new lamejs.Mp3Encoder(CHANNELS, SAMPLE_RATE, KBPS);
        this.socket = new WebSocket("ws://localhost:3000");
    }

    consume(chunk) {
        const mp3buf = this.mp3encoder.encodeBuffer(chunk);
        if (mp3buf.length > 0) {
            this.output.push(mp3buf);
            // TODO need to wait for socket.onopen
            this.socket.send(mp3buf);
        }
    }

    complete() {
        const mp3buf = this.mp3encoder.flush();   //finish writing mp3

        if (mp3buf.length > 0) {
            this.output.push(new Int8Array(mp3buf));
            this.socket.send(mp3buf);
        }

        postMessage(new Blob(this.output, {type: 'audio/mp3'}));
    }

}

const converter = new Converter();

onmessage = ({data}) => {
    if (data === null) {
        converter.complete();
        return;
    }
    converter.consume(data);
};
