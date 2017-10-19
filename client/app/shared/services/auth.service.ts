import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  // TODO demo behaviour and test behaviour

  loggedIn = false;

  jwtHelper: JwtHelper = new JwtHelper();

  currentSession = {
    subject: '',
    youtubeId: '',
    instructions: '',
    redirect: ''
  };

  constructor(private router: Router) { }

  login(session: string, study: string) {
    // TODO
    return Observable.of(null);
  }

  logout() {
    this.loggedIn = false;
    this.currentSession = {
      subject: '',
        youtubeId: '',
        instructions: '',
        redirect: ''
    };
    this.router.navigate(['/']);
  }

  decodeSessionFromToken(token) {
    return this.jwtHelper.decodeToken(token);
  }

  setCurrentSession(decodedSession) {
    this.loggedIn = true;
    this.currentSession.subject = decodedSession.subject;
    this.currentSession.youtubeId = decodedSession.youtubeId;
    this.currentSession.instructions = decodedSession.instructions;
    this.currentSession.redirect = decodedSession.redirect;
  }

}
