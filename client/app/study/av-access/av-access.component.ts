import { Component, OnInit } from '@angular/core';
import {UserMediaService} from '../../web-rtc/services/user-media.service';
import 'rxjs/add/operator/subscribeOn';
import {Router} from '@angular/router';
import {AudioUploadService} from '../../web-rtc/services/audio-upload.service';

@Component({
  selector: 'app-av-access',
  templateUrl: './av-access.component.html',
  styleUrls: ['./av-access.component.scss']
})
export class AvAccessComponent implements OnInit {

  public access = 'denied';

  constructor(private router: Router, private userMedia: UserMediaService, private audioCapture: AudioUploadService) { }

  ngOnInit() {

    //this.audioCapture.init();

    this.userMedia.$.subscribe(() => {
      this.access = 'granted';
    },
    (err: DOMException) => {
      console.error(err);
      // TODO handle error accordingly
      if (err.name === 'DevicesNotFoundError') {
        this.access = 'notFound';
      }
    });

    this.userMedia.getUserMedia();
  }

  reload() {
    console.log('reload clicked');
    window.location.reload();
  }

  continue() {
    this.router.navigate(['/calibration']);
  }

}
