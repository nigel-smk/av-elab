import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-speaker-calibration',
  templateUrl: './speaker-calibration.component.html',
  styleUrls: ['./speaker-calibration.component.css']
})
export class SpeakerCalibrationComponent implements OnInit {

  @Output() onCalibrated: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('audioTest') audioElement: ElementRef;
  public userInput = '';

  constructor() { }

  ngOnInit() {
  }

  playTestSound() {
    (this.audioElement.nativeElement as HTMLAudioElement).play();
  }

  onUpdate(input: string) {
    if (input === 'welcome') {
      this.onCalibrated.emit();
    }
  }

}
