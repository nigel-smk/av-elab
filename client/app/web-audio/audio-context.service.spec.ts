import { TestBed, inject } from '@angular/core/testing';

import { AudioContextService } from './audio-context.service';

describe('AudioContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioContextService]
    });
  });

  it('should be created', inject([AudioContextService], (service: AudioContextService) => {
    expect(service).toBeTruthy();
  }));

  it('should provide an observable that ')
});
