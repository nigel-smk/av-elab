import { TestBed, inject } from '@angular/core/testing';

import { ImageCaptureService } from './image-capture.service';

describe('ImageCaptureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageCaptureService]
    });
  });

  it('should be created', inject([ImageCaptureService], (service: ImageCaptureService) => {
    expect(service).toBeTruthy();
  }));
});
