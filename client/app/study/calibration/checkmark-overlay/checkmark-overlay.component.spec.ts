import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckmarkOverlayComponent } from './checkmark-overlay.component';

describe('CheckmarkOverlayComponent', () => {
  let component: CheckmarkOverlayComponent;
  let fixture: ComponentFixture<CheckmarkOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckmarkOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckmarkOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
