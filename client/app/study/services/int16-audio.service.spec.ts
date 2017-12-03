import { TestBed, inject } from '@angular/core/testing';

import { Int16AudioService } from './int16-audio.service';

describe('Int16AudioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Int16AudioService]
    });
  });

  it('should be created', inject([Int16AudioService], (service: Int16AudioService) => {
    expect(service).toBeTruthy();
  }));
});
