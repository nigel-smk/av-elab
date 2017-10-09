import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.scss']
})
export class CalibrationComponent implements OnInit, OnDestroy {

  public expectedEvents = new Set(['mic', 'webcam', 'speakers']);

  private subscription: ISubscription;

  constructor(private router: Router) { }

  ngOnInit() {
    // TODO some way other than referencing global document variable?
    this.subscription = Observable.fromEvent(document, 'keypress').subscribe((event: KeyboardEvent) => {
      if (event.keyCode == 32 && this.expectedEvents.size == 0) {
        this.router.navigate(['/briefing']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCalibrated(event: string) {
    this.expectedEvents.delete(event);
  }
}
