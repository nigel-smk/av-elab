import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-mic-calibration',
  // templateUrl: './mic-calibration.component.html',
  styleUrls: ['./mic-calibration.component.css'],
  template: `
    <app-calibration-template *ngIf="!complete">
      <card-header>
        Increase your microphone volume and tap the microphone until the meter fills up
      </card-header>
      <card-body>
        <app-mic-monitor [volumeData$]="volumeData$"></app-mic-monitor>
      </card-body>
    </app-calibration-template>
    <div class="alert alert-success" *ngIf="complete">Microphone calibration complete</div>
  `
})
export class MicCalibrationComponent implements OnInit {

  @Input() volumeData$: Observable<number>;
  @Output() onCalibrated: EventEmitter<void> = new EventEmitter<void>();
  public complete = false;

  constructor() { }

  ngOnInit() {
    this.volumeData$.pipe(
      takeWhile((volumeData: number) => volumeData < 255)
    ).subscribe({
      complete: () => {
        this.onCalibrated.emit();
        this.complete = true;
      }
    });
  }

}
