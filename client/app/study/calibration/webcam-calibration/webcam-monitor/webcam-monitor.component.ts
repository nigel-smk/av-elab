import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {UserMediaService} from '../../../../web-audio/user-media.service';

@Component({
  selector: 'app-webcam-monitor',
  templateUrl: './webcam-monitor.component.html',
  styleUrls: ['./webcam-monitor.component.scss']
})
export class WebcamMonitorComponent implements OnInit, OnDestroy {

  @ViewChild('webcamout') el: ElementRef;
  private subscription: ISubscription;
  public loaded = false;

  constructor(private userMedia: UserMediaService) { }


  ngOnInit() {
    this.subscription = this.userMedia.mediaStream$.subscribe((stream: MediaStream) => {
      // TODO fix ExpressionChangedAfterItHasBeenCheckedError
      this.loaded = true;
      this.gotStream(stream);
    });
  }

  gotStream(stream: MediaStream) {
    const videoElem = this.el.nativeElement;
    videoElem.srcObject = stream;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
