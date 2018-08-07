import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, of, defer} from 'rxjs';
import {shareReplay, switchAll} from 'rxjs/operators';

@Injectable()
export class AudioContextService {

  private audioContextSwitch$: ReplaySubject<Observable<AudioContext>> = new ReplaySubject(1);
  public audioContext$: Observable<AudioContext> = this.audioContextSwitch$.pipe(
    switchAll(),
    shareReplay()
  );

  public init() {
    // defer to avoid having to resume() https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
    this.audioContextSwitch$.next(defer(() => of(new AudioContext())));
  }

}
