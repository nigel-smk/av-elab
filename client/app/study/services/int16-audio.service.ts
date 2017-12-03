import {Injectable, OnDestroy} from '@angular/core';
import {UserMediaService} from './user-media.service';
import {ISubscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

const BUFFER_SIZE = 2048;

@Injectable()
export class Int16AudioService implements OnDestroy {

  private int16Data$: Observable<Int16Array>;
  private subscription: ISubscription;

  constructor(private userMedia: UserMediaService) { }

  get $() {
    if (!this.subscription) {
      this.init();
    }

    return this.int16Data$;
  }

  init() {
    const pipe = new ReplaySubject<MediaStream>(1);
    const output = new Subject<Int16Array>();

    this.int16Data$ = pipe.switchMap((stream: MediaStream) => {
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(BUFFER_SIZE, 1, 1);
      processor.onaudioprocess = (event: AudioProcessingEvent) => {
        const float32Data = event.inputBuffer.getChannelData(0);
        const data = this._float32toInt16(float32Data);
        output.next(data);
      };
      source.connect(processor);
      // apparently data flows only once there is a destination?
      processor.connect(audioCtx.destination);

      return output.asObservable();
    })
      .multicast(new Subject())
      .refCount();

    this.subscription = this.userMedia.$.subscribe(pipe);

  }

  private _float32toInt16(float32: Float32Array): Int16Array {
    const int16 = new Int16Array(float32.length);
    float32.forEach((element, index) => int16[index] = this._convert(element));
    return int16;
  }

  private _convert(n) {
    // https://stackoverflow.com/questions/25839216/convert-float32array-to-int16array
    // TODO is there a better way to do this? Why are floats always [-1, 1]
    const v = n < 0 ? n * 32768 : n * 32767;       // convert in range [-32768, 32767]
    return Math.max(-32768, Math.min(32768, v)); // clamp
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
