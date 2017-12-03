import { Injectable } from '@angular/core';
import {Int16AudioService} from './int16-audio.service';
import {ISubscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

@Injectable()
// TODO change to EncodingService and create an AudioUploadService
export class AudioCaptureService {

  worker: Worker;
  private mp3Data$: Subject<Int8Array> = new Subject<Int8Array>();
  subscription: ISubscription;

  // TODO create observable to send recorder state to subscribers

  constructor(private int16Audio: Int16AudioService) { }

  get $() {
    if (!this.subscription) {
      this.init();
    }

    return this.mp3Data$.asObservable();
  }

  init() {
    this.worker = new Worker('worker/worker.js');
    this.worker.onmessage = this.onWorkerReady.bind(this);
  }

  onWorkerReady(event: MessageEvent) {
    if (event.data === 'ready') {
      // TODO send STARTED signal

      this.worker.onmessage = this.onEncodedData.bind(this);

      this.subscription = this.int16Audio.$.subscribe((pcmData: Int16Array) => {
        this.worker.postMessage(pcmData);
      });
    }
  }

  onEncodedData(event: MessageEvent) {
    if (event.data === null) {
      // TODO send STOPPED event
      return;
    }

    this.mp3Data$.next(event.data as Int8Array);
  }

}
