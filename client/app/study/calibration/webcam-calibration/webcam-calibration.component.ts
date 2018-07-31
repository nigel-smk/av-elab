import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-webcam-calibration',
  template: `
    <app-actionable [type]="isCalibrated ? 'success' : 'info'">
      <header *ngIf="!isCalibrated">Center the camera on your face</header>
      <header *ngIf="isCalibrated">Webcam calibration complete</header>
      <body class="actionable-body">
        <app-checkmark-overlay *ngIf="isCalibrated"></app-checkmark-overlay>
        <app-webcam-monitor class="monitor">
          <img src="/images/liveFeedPlaceholder.gif"/>
        </app-webcam-monitor>
        <button app-button (click)="complete()">Done</button>
      </body>
    </app-actionable>
  `,
  styleUrls: ['./webcam-calibration.component.scss']
})
export class WebcamCalibrationComponent implements OnInit {

  @Output() onCalibrated: EventEmitter<void> = new EventEmitter<void>();
  public isCalibrated = false;

  constructor() { }

  ngOnInit() {
  }

  complete() {
    this.isCalibrated = true;
    this.onCalibrated.emit();
  }

}
