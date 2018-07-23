import { Injectable } from '@angular/core';
import {UserMediaService} from './web-audio/user-media.service';
import {AudioContextService} from './web-audio/audio-context.service';
import {AudioRecorderService} from './audio-recorder/audio-recorder.service';

@Injectable()
export class StartupService {

  constructor(
    private audioRecorder: AudioRecorderService,
    private userMedia: UserMediaService,
    private audioContext: AudioContextService
  ) { }

  init() {
    this.audioContext.init();
    this.audioRecorder.init(this.userMedia.mediaStream$, this.audioContext.audioContext$);
  }

}
