import {Observable, ConnectableObservable, Subscription, Subject} from 'rxjs';
import {share, takeUntil} from 'rxjs/operators';
import {mp3Encode} from '../audio-recorder/operators/mp3-encode.operator';
import {toBlob} from '../audio-recorder/operators/to-blob.operator';
import {aggregateBlobs} from '../audio-recorder/operators/aggregate-blobs.operator';
import {environment} from '../../environments/environment';
import {convertToPcmData} from '../audio-recorder/operators/convert-to-pcm-data.operator';
import {publish} from 'rxjs/internal/operators';

const pcmDataBufferSize = environment.pcmDataBufferSize;
const driveUploadBufferSize = environment.driveUploadBufferSize;

export class RecordingSession {

  public mp3Chunk$: Observable<Blob>;
  public mp3Complete$: Observable<Blob>;

  private streamControl: ConnectableObservable<Int8Array>;
  private startStream: Subscription;
  private endStream: Subject<void> = new Subject<void>();

  constructor(mediaStream$: Observable<MediaStream>, audioContext$: Observable<AudioContext>) {
    const mp3Data$ = mediaStream$.pipe(
      convertToPcmData(audioContext$, pcmDataBufferSize),
      mp3Encode()
    );

    this.streamControl = mp3Data$.pipe(publish()) as ConnectableObservable<Int8Array>;
    this.mp3Chunk$ = this.streamControl.pipe(
      takeUntil(this.endStream), // TODO encoder should be bundled with pcmData$. Need to figure out how to have pcmData$ initialize only after subscription
      share(),
      toBlob(driveUploadBufferSize)
    );
    this.mp3Complete$ = this.mp3Chunk$.pipe(
      aggregateBlobs('audio/mp3')
    );
  }

  start() {
    this.startStream = this.streamControl.connect();
  }

  pause() {
    if (this.startStream !== null) {
      this.startStream.unsubscribe();
    }
  }

  stop() {
    this.endStream.next();
    this.startStream.unsubscribe();
  }

}
