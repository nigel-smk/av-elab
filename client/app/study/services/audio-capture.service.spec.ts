import { TestBed, inject } from '@angular/core/testing';

import { AudioCaptureService } from './audio-capture.service';

describe('AudioCaptureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioCaptureService]
    });
  });

  it('should be created', inject([AudioCaptureService], (service: AudioCaptureService) => {
    expect(service).toBeTruthy();
  }));
});
