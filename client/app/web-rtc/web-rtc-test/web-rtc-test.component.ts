import { Component, OnInit } from '@angular/core';
import {UserMediaService} from '../services/user-media.service';
import {AudioUploadService} from '../services/audio-upload.service';
import {PcmDataService} from '../services/pcm-data.service';
import {Mp3BlobService} from '../services/mp3-blob.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-web-rtc-test',
  templateUrl: './web-rtc-test.component.html',
  styleUrls: ['./web-rtc-test.component.css']
})
export class WebRtcTestComponent implements OnInit {

  public mp3Url$: Observable<String>;

  constructor(private userMedia: UserMediaService,
              private audioCapture: AudioUploadService,
              private pcmData: PcmDataService,
              private mp3Blob: Mp3BlobService) { }

  ngOnInit() {
    this.userMedia.getUserMedia();

    this.mp3Url$ = this.mp3Blob.$.map((blob: Blob) => URL.createObjectURL(blob));

    // log
    this.mp3Blob.$.do((blob) => console.log(blob), () => '', () => console.log('blob complete'));
  }

  start() {
    this.audioCapture.init();
  }

  stop() {
    this.pcmData.completeStream()
  }

}
