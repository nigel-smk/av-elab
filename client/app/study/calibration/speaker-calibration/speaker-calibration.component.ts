import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-speaker-calibration',
  template: `
    <app-actionable [type]="isCalibrated ? 'success' : 'info'">
      <header *ngIf="!isCalibrated">
        Press play and then enter the spoken word
      </header>
      <header *ngIf="isCalibrated">
        Headphone calibration complete
      </header>
      <body>
        <app-checkmark-overlay *ngIf="isCalibrated"></app-checkmark-overlay>
        <!-- TODO get spinDuration from HTMLMediaElement.duration -->
        <app-play-button 
          [spinDuration]="1"
          src="/assets/welcome.mp3"
        ></app-play-button>
        <!-- TODO set focus on play button click -->
        <input
          [(ngModel)]="userInput" 
          (ngModelChange)="onUpdate($event)"
          [disabled]="isCalibrated"
          type="text" 
          class="user-input form-control" 
          placeholder="Enter here..." 
          required
        />
      </body>
    </app-actionable>
    <!--<audio #audioTest>-->
      <!--<source src="/assets/welcome.mp3" type="audio/mpeg"/>-->
    <!--</audio>-->
  `,
  styleUrls: ['./speaker-calibration.component.scss']
})
export class SpeakerCalibrationComponent implements OnInit {

  @Output() onCalibrated: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('audioTest') audioElement: ElementRef;
  public userInput = '';
  public isCalibrated = false;

  constructor() { }

  ngOnInit() {
  }

  // playTestSound() {
  //   (this.audioElement.nativeElement as HTMLAudioElement).play();
  // }

  onUpdate(input: string) {
    if (input === 'welcome') {
      this.isCalibrated = true;
      this.onCalibrated.emit();
    }
  }

}
