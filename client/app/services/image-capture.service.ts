import {Injectable, OnDestroy} from '@angular/core';
import {UserMediaService} from './user-media.service';
import {ISubscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Http} from '@angular/http';

@Injectable()
export class ImageCaptureService implements OnDestroy {

  private videoElement: HTMLVideoElement = document.createElement('video');
  private canvasElement: HTMLCanvasElement = document.createElement('canvas');
  private subscription: ISubscription;

  constructor(private userMedia: UserMediaService, private http: Http) { }

  ngOnDestroy() {
      this.stop();
  }

  start() {
    this.subscription = this.userMedia.$.switchMap((stream: MediaStream) => {
      const canvas = this.canvasElement;
      const video = this.videoElement;

      this.videoElement.src = window.URL.createObjectURL(stream);

      canvas.width = 200;
      canvas.height = 200;

      // TODO set interval and canvas size and image type/quality in environment
      return Observable.interval(2000).map(() => {
        canvas.getContext('2d')
          .drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg', 0.1);
      });
    }).subscribe((snapshot) => {
      // send snapshot to server
      console.log('server snapshot');
      this.http.post('/api/image-upload', {snapshot: snapshot})
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
