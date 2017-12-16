import {Injectable, OnDestroy} from '@angular/core';
import {Mp3EncoderService} from './mp3-encoder.service';
import {ISubscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class Mp3BlobService implements OnDestroy {

  sourceSwitch$: ReplaySubject<Observable<Blob>> = new ReplaySubject(1);
  mp3Blob$: Observable<Blob> = this.sourceSwitch$.switchMap(obs => obs);
  subscription: ISubscription;

  constructor(private mp3Encoder: Mp3EncoderService) { }

  get $() {
    if (!this.subscription || this.subscription.closed) {
      this.init();
    }

    return this.mp3Blob$;
  }

  init() {
    const pipe: Subject<Int8Array> = new Subject();

    const mp3Blob$ = pipe
      .reduce((acc, chunk): Int8Array[] => {
        acc.push(chunk);
        return acc;
      }, [])
      .map((binary: Int8Array[]) => new Blob(binary, {type: 'audio/mp3'}))
      .do({complete: () => this.init()});

    this.sourceSwitch$.next(mp3Blob$);
    this.subscription = this.mp3Encoder.$.subscribe(pipe);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
