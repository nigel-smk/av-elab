import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {switchAll, shareReplay} from 'rxjs/operators';

@Injectable()
export class UserMediaService {

  private mediaStreamSwitch$: Subject<Observable<MediaStream>> = new Subject;
  public mediaStream$: Observable<MediaStream> = this.mediaStreamSwitch$.pipe(
    switchAll(),
    // TODO shareReplay does not seem to work (test with audio-context service)
    shareReplay(1)
  );

  private getUserMedia(constraints: MediaStreamConstraints): Observable<MediaStream> {
    // we must defer the fromPromise to make it a "cold" observable. Otherwise errors get thrown before there are subscribers
    return Observable.defer(() => {
      // TODO check for outdated userMedia methods
      return Observable.fromPromise(navigator.mediaDevices.getUserMedia(constraints));
    });
  }

  public init(constraints: MediaStreamConstraints) {
    this.mediaStreamSwitch$.next(this.getUserMedia(constraints));
  }
}
