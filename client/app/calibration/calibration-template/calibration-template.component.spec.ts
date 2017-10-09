import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationTemplateComponent } from './calibration-template.component';

describe('CalibrationTemplateComponent', () => {
  let component: CalibrationTemplateComponent;
  let fixture: ComponentFixture<CalibrationTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalibrationTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
