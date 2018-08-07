import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserMediaService} from '../../web-audio/user-media.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-av-access',
  templateUrl: './av-access.component.html',
  styleUrls: ['./av-access.component.scss']
})
export class AvAccessComponent implements OnInit {

  public access = 'pending';

  constructor(private router: Router, private userMedia: UserMediaService) { }

  ngOnInit() {
    this.userMedia.mediaStream$.subscribe(() => {
      this.access = 'granted';
    },
    (err: DOMException) => {
      console.error(err);
      // TODO handle all rejection types
      if (err.name === 'NotFoundError') {
        this.access = 'notFound';
      }
    });

    this.userMedia.init(environment.mediaConstraints);
  }

  reload() {
    console.log('reload clicked');
    window.location.reload();
  }

  continue() {
    this.router.navigate(['/calibration']);
  }

}
