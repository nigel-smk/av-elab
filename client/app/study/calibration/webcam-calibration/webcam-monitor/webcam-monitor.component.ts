import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {UserMediaService} from '../../../../web-audio/user-media.service';

@Component({
  selector: 'app-webcam-monitor',
  templateUrl: './webcam-monitor.component.html',
  styleUrls: ['./webcam-monitor.component.css']
})
export class WebcamMonitorComponent implements AfterViewInit, OnDestroy {

  @ViewChild('webcamout') el: ElementRef;
  private subscription: ISubscription;
  public loaded = false;

  constructor(private userMedia: UserMediaService) { }


  ngAfterViewInit() {
    this.subscription = this.userMedia.mediaStream$.subscribe((stream: MediaStream) => {
      // TODO fix ExpressionChangedAfterItHasBeenCheckedError
      this.loaded = true;
      this.gotStream(stream);
    });
  }

  gotStream(stream: MediaStream) {
    const videoElem = this.el.nativeElement;
    const vendorURL = window.URL;
    videoElem.src = vendorURL.createObjectURL(stream);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
