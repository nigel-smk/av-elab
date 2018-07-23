import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {concatAll, shareReplay} from 'rxjs/operators';

@Injectable()
export class AudioContextService {

  private audioContextSwitch$: Subject<Observable<AudioContext>> = new Subject;
  public audioContext$: Observable<AudioContext> = this.audioContextSwitch$.pipe(
    concatAll(),
    shareReplay(1)
  );

  private createAudioContext(): Observable<AudioContext> {
    return new Observable(observer => observer.next(new AudioContext()));
  }

  public init() {
    this.audioContextSwitch$.next(this.createAudioContext());
  }

}
