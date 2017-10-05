import { Component, OnInit } from '@angular/core';
import {UserMediaService} from '../services/user-media.service';
import 'rxjs/add/operator/subscribeOn';

@Component({
  selector: 'app-av-access',
  templateUrl: './av-access.component.html',
  styleUrls: ['./av-access.component.css']
})
export class AvAccessComponent implements OnInit {

  public access = 'denied';

  constructor(private userMedia: UserMediaService) { }

  ngOnInit() {
    this.userMedia.$.subscribe(() => {
      this.access = 'granted';
    },
    (err: DOMException) => {
      // TODO handle error accordingly
      if (err.name === 'DevicesNotFoundError') {
        this.access = 'notFound';
      }
    });

    // TODO set constraints in environment file
    this.userMedia.getUserMedia({
      audio: true,
      video: true
    });
  }

}
