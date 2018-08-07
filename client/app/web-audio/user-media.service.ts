import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, defer, from} from 'rxjs';
import {switchAll, shareReplay} from 'rxjs/operators';

@Injectable()
export class UserMediaService {

  private mediaStreamSwitch$: ReplaySubject<Observable<MediaStream>> = new ReplaySubject(1);
  public mediaStream$: Observable<MediaStream> = this.mediaStreamSwitch$.pipe(
    switchAll(),
    // TODO shareReplay does not seem to work (test with audio-context service)
    shareReplay(1)
  );

  private getUserMedia(constraints: MediaStreamConstraints): Observable<MediaStream> {
    // we must defer the fromPromise to make it a "cold" observable. Otherwise errors get thrown before there are subscribers
    return defer(() => {
      // TODO check for outdated userMedia methods
      return from(navigator.mediaDevices.getUserMedia(constraints));
    });
  }

  public init(constraints: MediaStreamConstraints) {
    this.mediaStreamSwitch$.next(this.getUserMedia(constraints));
  }
}
