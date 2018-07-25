import { Injectable } from '@angular/core';
import {UserMediaService} from '../../web-audio/user-media.service';
import {AudioContextService} from '../../web-audio/audio-context.service';
import {RecordingSession} from '../../web-audio/recording-session';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AudioCaptureService {

  private recordingSession: RecordingSession;

  constructor(private userMedia: UserMediaService, private audioContext: AudioContextService) { }

  start() {
    if (!this.recordingSession) {
      this.recordingSession = new RecordingSession(this.userMedia.mediaStream$, this.audioContext.audioContext$);
    }
    this.recordingSession.start();
    this.upload(this.recordingSession.mp3Chunk$)
  }

  stop() {
    this.recordingSession.stop();
    this.recordingSession = undefined;
  }

  upload(mp3Chunk$: Observable<Blob>) {
    mp3Chunk$.subscribe(console.log, console.error);
  }

}
