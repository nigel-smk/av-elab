import { TestBed, inject } from '@angular/core/testing';

import { PhaseGuardService } from './phase-guard.service';

describe('PhaseGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhaseGuardService]
    });
  });

  it('should be created', inject([PhaseGuardService], (service: PhaseGuardService) => {
    expect(service).toBeTruthy();
  }));
});
