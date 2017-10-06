import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicMonitorComponent } from './mic-monitor.component';

describe('MicMonitorComponent', () => {
  let component: MicMonitorComponent;
  let fixture: ComponentFixture<MicMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
