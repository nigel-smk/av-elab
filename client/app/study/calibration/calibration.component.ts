import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {UserMediaService} from '../../web-audio/user-media.service';
import {AudioContextService} from '../../web-audio/audio-context.service';
import {fourierTransform} from '../../web-audio/operators/fourier-transform';
import {volumeTransform} from '../../web-audio/operators/volume-transform';

@Component({
  selector: 'app-calibration',
  styleUrls: ['./calibration.component.scss'],
  template: `
    <div class="briefing alert alert-info">
      Please complete the three calibration tasks below to ensure your webcam, microphone and headphones are properly set up.
    </div>
    <div class="calibration" [ngSwitch]="currentPhase">
      <app-webcam-calibration 
        (onCalibrated)="onCalibrated('webcam')"
      ></app-webcam-calibration>
      <app-mic-calibration 
        [volumeData$]="volumeData$" 
        (onCalibrated)="onCalibrated('mic')"
      ></app-mic-calibration>
      <app-speaker-calibration (onCalibrated)="onCalibrated('speakers')"></app-speaker-calibration>
    </div>
    <div class="continue" *ngIf="expectedEvents.size == 0">
      Once you begin the study, you must complete it in one sitting.<br>
      Press space bar when you are ready to begin the study...
    </div>
  `
})
export class CalibrationComponent implements OnInit, OnDestroy {

  public phases = ['webcam', 'mic', 'speakers'];
  public currentPhase = 'webcam';
  public expectedEvents = new Set(this.phases);
  public volumeData$: Observable<number>;

  private subscription: ISubscription;

  constructor(
    private router: Router,
    private userMedia: UserMediaService,
    private audioContext: AudioContextService
  ) {
    this.volumeData$ = userMedia.mediaStream$.pipe(
      fourierTransform(this.audioContext.audioContext$),
      volumeTransform
    );
  }

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
