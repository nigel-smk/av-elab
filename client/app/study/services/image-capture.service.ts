import {Injectable, OnDestroy} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Http, Headers} from '@angular/http';
import {AuthService} from '../../shared/services/auth.service';
import {UserMediaService} from '../../web-audio/user-media.service';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class ImageCaptureService implements OnDestroy {

  private videoElement: HTMLVideoElement = document.createElement('video');
  private canvasElement: HTMLCanvasElement = document.createElement('canvas');
  private snapCount = 0;
  private subscription: ISubscription;

  private headers: Headers;

  constructor(private userMedia: UserMediaService, private http: Http, private auth: AuthService) {
    this.headers = new Headers();
    this.headers.append('x-access-token', this.auth.token);
  }

  ngOnDestroy() {
      this.stop();
  }

  start() {
    this.subscription = this.userMedia.mediaStream$.pipe(
      switchMap((stream: MediaStream) => {
        const canvas = this.canvasElement;
        const video = this.videoElement;

        this.videoElement.srcObject = stream;

        canvas.width = 200;
        canvas.height = 200;

        // TODO set interval and canvas size and image type/quality in environment
        return Observable.interval(2000).map(() => {
          canvas.getContext('2d')
            .drawImage(video, 0, 0, canvas.width, canvas.height);
          return canvas.toDataURL('image/jpeg', 0.1);
        });
      })
    ).subscribe((snapshot) => {
      // send snapshot to server
      this.snapCount += 1;
      console.log('server snapshot');
      this.http.post('/api/image-upload', {
        filename: `${this.snapCount}.jpg`.padStart(8, '0'),
        snapshot: snapshot
      }, {headers: this.headers})
        .subscribe(() => console.log('post success'),
          (err) => console.log(err));
    });
  }

  stop() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
