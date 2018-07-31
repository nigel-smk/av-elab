import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-mic-calibration',
  styleUrls: ['./mic-calibration.component.scss'],
  template: `    
    <app-actionable [type]="isCalibrated ? 'success' : 'info'">
      <header *ngIf="!isCalibrated">
        Increase your microphone volume and tap the microphone until the meter fills up
      </header>
      <header *ngIf="isCalibrated">
        Microphone calibration complete
      </header>
      <body class="actionable-body">
        <app-checkmark-overlay *ngIf="isCalibrated"></app-checkmark-overlay>
        <app-mic-monitor [volumeData$]="volumeData$"></app-mic-monitor>
      </body>
    </app-actionable>
  `
})
export class MicCalibrationComponent implements OnInit {

  @Input() volumeData$: Observable<number>;
  @Output() onCalibrated: EventEmitter<void> = new EventEmitter<void>();
  public isCalibrated = false;

  constructor() { }

  ngOnInit() {
    this.volumeData$.pipe(
      takeWhile((volumeData: number) => volumeData < 255)
    ).subscribe({
      complete: () => {
        this.onCalibrated.emit();
        this.isCalibrated = true;
      }
    });
  }

}
