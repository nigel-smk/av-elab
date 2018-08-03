import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {UserMediaService} from '../../../../web-audio/user-media.service';

@Component({
  selector: 'app-webcam-monitor',
  template: `
    <video #webcamout autoplay [hidden]="!loaded"></video>
    <img src="/assets/loading.gif" [hidden]="loaded">

  `,
  styleUrls: ['./webcam-monitor.component.scss']
})
export class WebcamMonitorComponent implements OnInit, OnDestroy {

  @ViewChild('webcamout') el: ElementRef;
  private subscription: ISubscription;
  public loaded = false;

  constructor(private userMedia: UserMediaService) { }


  ngOnInit() {
    this.subscription = this.userMedia.mediaStream$.subscribe((stream: MediaStream) => {
      this.loaded = true;
      this.gotStream(stream);
    });
  }

  gotStream(stream: MediaStream) {
    const videoElem = this.el.nativeElement;
    // TODO why doesn't the muted attribute work on the video tag? https://stackoverflow.com/questions/14111917/html5-video-muted-but-stilly-playing
    videoElem.muted = true;
    videoElem.srcObject = stream;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
