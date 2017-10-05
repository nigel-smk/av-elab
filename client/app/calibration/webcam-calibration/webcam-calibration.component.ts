import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-webcam-calibration',
  templateUrl: './webcam-calibration.component.html',
  styleUrls: ['./webcam-calibration.component.css']
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
