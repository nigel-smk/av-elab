import {defer, from, Observable} from 'rxjs';

export function getUserMedia(constraints: MediaStreamConstraints): Observable<MediaStream> {
  // we must defer the fromPromise to make it a "cold" observable. Otherwise errors get thrown before there are subscribers
  return defer(() => {
    return from(navigator.mediaDevices.getUserMedia(constraints));
  });
}
