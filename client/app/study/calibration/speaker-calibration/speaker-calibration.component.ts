import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-speaker-calibration',
  template: `
    <div class="alert alert-success" *ngIf="isCalibrated">Speaker calibration complete</div>
    <app-actionable [type]="isCalibrated ? 'success' : 'info'">
      <header *ngIf="!isCalibrated">
        Press play and then enter the spoken word
      </header>
      <header *ngIf="isCalibrated">
        Headphone calibration complete
      </header>
      <body>
        <div class="instructions">
          Enter the word from<br>
          <button (click)="playTestSound()">this audio clip</button><br/>
          <input type="text" class="user-input form-control" placeholder="in this field" [(ngModel)]="userInput" (ngModelChange)="onUpdate($event)" required>
        </div>
      </body>
    </app-actionable>
    <audio #audioTest>
      <source src="/assets/welcome.mp3" type="audio/mpeg"/>
    </audio>
  `,
  styleUrls: ['./speaker-calibration.component.css']
})
export class SpeakerCalibrationComponent implements OnInit {

  @Output() onCalibrated: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('audioTest') audioElement: ElementRef;
  public userInput = '';
  public isCalibrated = false;

  constructor() { }

  ngOnInit() {
  }

  playTestSound() {
    (this.audioElement.nativeElement as HTMLAudioElement).play();
  }

  onUpdate(input: string) {
    if (input === 'welcome') {
      this.isCalibrated = true;
      this.onCalibrated.emit();
    }
  }

}
