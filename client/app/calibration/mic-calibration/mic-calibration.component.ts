import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VolumeDataService} from '../../services/volume-data.service';

@Component({
  selector: 'app-mic-calibration',
  templateUrl: './mic-calibration.component.html',
  styleUrls: ['./mic-calibration.component.css']
})
export class MicCalibrationComponent implements OnInit {

  @Output() onCalibrated: EventEmitter<void> = new EventEmitter<void>();
  public complete = false;

  constructor(private volumeData: VolumeDataService) { }

  ngOnInit() {
    this.volumeData.$.subscribe((volumeData: number) => {
      if (volumeData === 255) {
        this.onCalibrated.emit();
        this.complete = true;
      }
    });
  }

}
