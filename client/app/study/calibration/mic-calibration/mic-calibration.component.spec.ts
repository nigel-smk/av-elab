import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicCalibrationComponent } from './mic-calibration.component';

describe('MicCalibrationComponent', () => {
  let component: MicCalibrationComponent;
  let fixture: ComponentFixture<MicCalibrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicCalibrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
