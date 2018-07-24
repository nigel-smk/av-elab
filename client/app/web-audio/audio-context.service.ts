import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class AudioContextService {

  private audioContextSwitch$: ReplaySubject<AudioContext> = new ReplaySubject(1);
  public audioContext$: Observable<AudioContext> = this.audioContextSwitch$.asObservable();

  public init() {
    this.audioContextSwitch$.next(new AudioContext());
  }

}
