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
        <app-play-button 
          (click)="onPlay()"
          src="/assets/welcome.mp3"
        ></app-play-button>
        <!-- TODO set focus on play button click -->
        <input #input
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
  `,
  styleUrls: ['./speaker-calibration.component.scss']
})
export class SpeakerCalibrationComponent implements OnInit {

  @Output() onCalibrated: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('input') inputElement: ElementRef;
  public userInput = '';
  public isCalibrated = false;

  constructor() { }

  ngOnInit() {
  }

  onPlay() {
    this.inputElement.nativeElement.focus();
  }

  onUpdate(input: string) {
    if (input === 'welcome') {
      this.isCalibrated = true;
      this.onCalibrated.emit();
    }
  }

}
