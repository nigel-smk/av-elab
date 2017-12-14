import { Component, OnInit } from '@angular/core';
import {UserMediaService} from '../services/user-media.service';
import {AudioUploadService} from '../services/audio-upload.service';

@Component({
  selector: 'app-web-rtc-test',
  templateUrl: './web-rtc-test.component.html',
  styleUrls: ['./web-rtc-test.component.css']
})
export class WebRtcTestComponent implements OnInit {

  constructor(private userMedia: UserMediaService, private audioCapture: AudioUploadService) { }

  ngOnInit() {

    this.audioCapture.init();

    this.userMedia.$.subscribe(() => {
        console.log('granted');
      },
      (err: DOMException) => {
        // TODO handle error accordingly
        if (err.name === 'DevicesNotFoundError') {
          console.log('not found');
        }
      });

      this.userMedia.getUserMedia();
  }

}
