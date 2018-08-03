import {Observable} from 'rxjs/Observable';
import {using} from 'rxjs/observable/using';
import {ISubscription} from 'rxjs/Subscription';
import {combineLatest, map, switchAll} from 'rxjs/operators';
import {Scheduler} from 'rxjs/Rx';

export function fourierTransform(audioContext$: Observable<AudioContext>) {

  return (mediaStream$: Observable<MediaStream>) => {

    return mediaStream$.pipe(
      // combine with audioContext as both are needed to create an FFTResource
      combineLatest(audioContext$, (mediaStream: MediaStream, audioContext: AudioContext) => {

        const resourceFactory = () => new FFTResource(mediaStream, audioContext);

        // refresh the frequencyData array on each animationFrame
        const fft$Factory = (resource: FFTResource) => Observable.interval(0, Scheduler.animationFrame).pipe(
          map(() => {
            const {analyser, frequencyData} = resource;
            analyser.getByteFrequencyData(frequencyData);
            return frequencyData.slice();
          })
        );

        return using(resourceFactory, fft$Factory);
      }),
      // switch to flatten the higher-order observable returned from zip
      switchAll()
    );
  };
}

class FFTResource implements ISubscription {

  public closed = false;

  private source: MediaStreamAudioSourceNode;
  public analyser: AnalyserNode;
  public frequencyData: Uint8Array;

  // TODO accept options object to define fft params
  constructor(mediaStream: MediaStream, audioContext: AudioContext) {
    console.log("build it up");
    this.source = audioContext.createMediaStreamSource(mediaStream);
    this.analyser = audioContext.createAnalyser();
    this.analyser.disconnect();
    this.source.disconnect();
    this.source.connect(this.analyser);
    this.analyser.fftSize = 32;
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
  }

  unsubscribe(): void {
    console.log("tear it down!");
    this.analyser.disconnect();
    this.source.disconnect();
    this.closed = true;
  }

}
