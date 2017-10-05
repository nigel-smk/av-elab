import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/defer';

@Injectable()
export class UserMediaService {

  private sourceSwitch$ = new Subject<Observable<MediaStream>>();
  private mediaStream$: Observable<MediaStream> = this.sourceSwitch$
    .switchMap((obs) => obs)
    .multicast(new ReplaySubject(1))
    .refCount();

  constructor() { }

  get $(): Observable<MediaStream> {
    return this.mediaStream$;
  }

  getUserMedia(constraints: MediaStreamConstraints) {

    // we must defer the fromPromise to make it a "cold" observable. Otherwise errors get thrown before there are subscribers
    const deferredPromise$ = Observable.defer(() => {
      return Observable.fromPromise(navigator.mediaDevices.getUserMedia(constraints));
    });

    this.sourceSwitch$.next(deferredPromise$);

  }

}
