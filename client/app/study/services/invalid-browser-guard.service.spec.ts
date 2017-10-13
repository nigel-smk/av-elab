import { TestBed, inject } from '@angular/core/testing';

import { InvalidBrowserGuardService } from './invalid-browser-guard.service';

describe('InvalidBrowserGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvalidBrowserGuardService]
    });
  });

  it('should be created', inject([InvalidBrowserGuardService], (service: InvalidBrowserGuardService) => {
    expect(service).toBeTruthy();
  }));
});
