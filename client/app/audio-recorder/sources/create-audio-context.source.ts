import {Observable} from 'rxjs/index';

export function createAudioContext(): Observable<AudioContext> {
  return new Observable(observer => observer.next(new AudioContext()));
}
