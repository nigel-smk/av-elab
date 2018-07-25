import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription';
import {SessionData} from '../../models/session-data';
import {SessionDataService} from '../services/session-data.service';
import {ImageCaptureService} from '../services/image-capture.service';
import {AudioCaptureService} from '../services/audio-capture.service';

enum YTEvent {
  UNSTARTED = -1,
  ENDED,
  PLAYING,
  PAUSED,
  BUFFERING,
  VIDEOCUED = 5
}

@Component({
  selector: 'app-stimulus',
  templateUrl: './stimulus.component.html',
  styleUrls: ['./stimulus.component.css']
})
export class StimulusComponent implements OnInit, OnDestroy {

  public sessionDataSubscription: ISubscription;
  private keypressSubscription: ISubscription;
  public data: SessionData;
  public player: YT.Player;
  // TODO fetch from environment
  public playerVars = {
    autoplay: 1,
    html5: 1,
    theme: 'light',
    color: 'white',
    iv_load_policy: 3,
    showinfo: 0,
    controls: 0,
    fs: 0,
    modestBranding: 1,
    rel: 0,
    disablekb: 0
  };

  constructor(
    private sessionData: SessionDataService,
    private imageCapture: ImageCaptureService,
    private audioCapture: AudioCaptureService) { }

  ngOnInit() {
    this.audioCapture.start();
    this.imageCapture.start();

    this.keypressSubscription = Observable.fromEvent(document, 'keypress').subscribe((event: KeyboardEvent) => {
      if (event.keyCode == 32 && this.data) {
        this.onStimulusEnd()
      }
    });

    this.sessionDataSubscription = this.sessionData.$.subscribe((sessionData: SessionData) => {
      this.data = sessionData;
    });
  }

  ngOnDestroy() {
    this.keypressSubscription.unsubscribe();
    this.sessionDataSubscription.unsubscribe();
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event) {
    console.log('player state', event.data);
    // video ends without user input
    if (event.data === YTEvent.ENDED) {
      this.onStimulusEnd();
    }
  }

  onStimulusEnd() {
    this.data.stopTime = this.player.getCurrentTime();
    this.imageCapture.stop();
    this.audioCapture.stop();
    // append query parameters to url
    // TODO can '?' be anywhere in a url other than the start of the query string?
    const hasQueryString: boolean = this.data.redirect.indexOf('?') != -1;
    let redirect = `${this.data.redirect}${hasQueryString ? '&' : '?'}`;
    if (this.data.subject) {
      redirect += `subject=${this.data.subject}&`;
    }
    if (this.data.subject) {
      redirect += `study=${this.data.study}&`;
    }
    if (this.data.stopTime) {
      redirect += `stop-time=${this.data.stopTime}&`;
    }
    window.location.href = redirect.substr(0, redirect.length - 1);
  }

}
