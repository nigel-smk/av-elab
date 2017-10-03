import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvAccessComponent } from './av-access.component';

describe('AvAccessComponent', () => {
  let component: AvAccessComponent;
  let fixture: ComponentFixture<AvAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
