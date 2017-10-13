import { TestBed, inject } from '@angular/core/testing';

import { EntryGuardService } from './entry-guard.service';

describe('EntryGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryGuardService]
    });
  });

  it('should be created', inject([EntryGuardService], (service: EntryGuardService) => {
    expect(service).toBeTruthy();
  }));
});
