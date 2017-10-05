import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.css']
})
export class CalibrationComponent implements OnInit {

  public expectedEvents = new Set(['micCalibrated', 'webcamCalibrated', 'speakersCalibrated']);

  constructor() { }

  ngOnInit() {
  }

}
