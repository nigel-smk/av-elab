import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.css']
})
export class CalibrationComponent implements OnInit {

  public expectedEvents = new Set(['mic', 'webcam', 'speakers']);

  constructor() { }

  ngOnInit() {
  }

  onCalibrated(event: string) {
    this.expectedEvents.delete(event);
  }
}
