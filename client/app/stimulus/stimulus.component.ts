import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {SessionData} from '../../models/session-data';
import {SessionDataService} from '../services/session-data.service';

@Component({
  selector: 'app-stimulus',
  templateUrl: './stimulus.component.html',
  styleUrls: ['./stimulus.component.css']
})
export class StimulusComponent implements OnInit, OnDestroy {

  // TODO redirect at video end

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

  constructor(private router: Router, private sessionData: SessionDataService) { }

  ngOnInit() {
    this.keypressSubscription = Observable.fromEvent(document, 'keypress').subscribe((event: KeyboardEvent) => {
      if (event.keyCode == 32 && this.data) {
        window.location.href = this.data.redirectUrl;
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
  }

}
