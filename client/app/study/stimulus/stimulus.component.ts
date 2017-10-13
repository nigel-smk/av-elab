import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription';
import {SessionData} from '../../models/session-data';
import {SessionDataService} from '../services/session-data.service';
import {ImageCaptureService} from '../services/image-capture.service';

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

  constructor(private sessionData: SessionDataService, private imageCapture: ImageCaptureService) { }

  ngOnInit() {
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
    // append query parameters to url
    let redirectUrl = this.data.redirectUrl + '?';
    redirectUrl += this.data.session ? 'session="' + this.data.session + '"&' : '';
    redirectUrl += this.data.study ? 'study="' + this.data.study + '"&' : '';
    redirectUrl += this.data.stopTime ? 'stop-time="' + this.data.stopTime + '"&' : '';
    window.location.href = redirectUrl.substr(0, redirectUrl.length - 1);
  }

}
