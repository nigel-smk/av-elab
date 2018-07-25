import {Component, OnInit} from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import {StartupService} from './startup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private startup: StartupService
  ) { }

  ngOnInit(): void {
    this.startup.init();
    // this.startup.test();
  }

}
