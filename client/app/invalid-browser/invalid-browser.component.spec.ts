import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidBrowserComponent } from './invalid-browser.component';

describe('InvalidBrowserComponent', () => {
  let component: InvalidBrowserComponent;
  let fixture: ComponentFixture<InvalidBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
