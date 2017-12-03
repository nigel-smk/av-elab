import { Component, OnInit } from '@angular/core';
import {UserMediaService} from '../services/user-media.service';
import 'rxjs/add/operator/subscribeOn';
import {Router} from '@angular/router';
import {ImageCaptureService} from '../services/image-capture.service';
import {AudioCaptureService} from '../services/audio-capture.service';

@Component({
  selector: 'app-av-access',
  templateUrl: './av-access.component.html',
  styleUrls: ['./av-access.component.scss']
})
export class AvAccessComponent implements OnInit {

  public access = 'denied';

  constructor(private router: Router, private userMedia: UserMediaService, private audioCapture: AudioCaptureService) { }

  ngOnInit() {

    this.audioCapture.init();

    this.userMedia.$.subscribe(() => {
      this.access = 'granted';
    },
    (err: DOMException) => {
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
