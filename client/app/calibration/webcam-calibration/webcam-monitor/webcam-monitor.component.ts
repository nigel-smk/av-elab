import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserMediaService} from '../../../services/user-media.service';
import {ISubscription} from 'rxjs/Subscription';

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
    this.subscription = this.userMedia.$.subscribe((stream: MediaStream) => {
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
