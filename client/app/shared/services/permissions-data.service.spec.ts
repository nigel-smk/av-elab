import { TestBed, inject } from '@angular/core/testing';

import { PermissionsDataService } from './permissions-data.service';

describe('PermissionsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionsDataService]
    });
  });

  it('should be created', inject([PermissionsDataService], (service: PermissionsDataService) => {
    expect(service).toBeTruthy();
  }));
});
