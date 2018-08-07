import { Injectable } from '@angular/core';
import {UserMediaService} from './web-audio/user-media.service';
import {AudioContextService} from './web-audio/audio-context.service';
import {AudioRecorderService} from './audio-recorder/audio-recorder.service';
import {AudioCaptureService} from './study/services/audio-capture.service';

@Injectable()
export class StartupService {

  constructor(
    private audioRecorder: AudioRecorderService,
    private userMedia: UserMediaService,
    private audioContext: AudioContextService,
    private audioCapture: AudioCaptureService
  ) { }

  init() {
    this.audioContext.init();
    this.audioRecorder.init(this.userMedia.mediaStream$, this.audioContext.audioContext$);

  }

  test() {
    this.audioCapture.start();
    setTimeout(() => this.audioCapture.stop(), 20000);
    // this.userMedia.mediaStream$.pipe(
    //   fourierTransform(this.audioContext.audioContext$)
    // ).subscribe(console.log, console.error);
  }

}
