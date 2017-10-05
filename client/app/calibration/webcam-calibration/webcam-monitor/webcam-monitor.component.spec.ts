import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamMonitorComponent } from './webcam-monitor.component';

describe('WebcamMonitorComponent', () => {
  let component: WebcamMonitorComponent;
  let fixture: ComponentFixture<WebcamMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
