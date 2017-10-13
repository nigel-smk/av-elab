import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamCalibrationComponent } from './webcam-calibration.component';

describe('WebcamCalibrationComponent', () => {
  let component: WebcamCalibrationComponent;
  let fixture: ComponentFixture<WebcamCalibrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamCalibrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
