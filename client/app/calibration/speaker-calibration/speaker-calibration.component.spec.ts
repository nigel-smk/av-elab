import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerCalibrationComponent } from './speaker-calibration.component';

describe('SpeakerCalibrationComponent', () => {
  let component: SpeakerCalibrationComponent;
  let fixture: ComponentFixture<SpeakerCalibrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerCalibrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
