import { Component, OnInit } from '@angular/core';
import {SessionDataService} from '../services/session-data.service';
import {Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {SessionData} from '../../models/session-data';

@Component({
  selector: 'app-briefing',
  template: `
    <div class="instructions">
      {{ (data | async).briefing }}
    </div>
    <div class="continue">
      Press space bar to start the video...
    </div>
  `,
  styleUrls: ['./briefing.component.scss']
})
export class BriefingComponent implements OnInit {

  public data: Observable<SessionData>;
  private subscription: ISubscription;

  constructor(private sessionData: SessionDataService, private router: Router) {
    this.data = sessionData.$;
  }

  ngOnInit() {
    this.subscription = Observable.fromEvent(document, 'keypress').subscribe((event: KeyboardEvent) => {
      if (event.keyCode == 32) {
        this.router.navigate(['/stimulus']);
      }
    });
  }

}
