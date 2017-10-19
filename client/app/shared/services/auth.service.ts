import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import {Http, Response, Headers} from '@angular/http';
import {SessionDataService} from '../../study/services/session-data.service';
import {SessionData} from '../../models/session-data';
import {AdminAuthService} from './admin-auth.service';

@Injectable()
export class AuthService {
  // TODO demo behaviour and test behaviour

  jwtHelper: JwtHelper = new JwtHelper();
  loggedIn = false;
  token = '';
  currentSession: SessionData;

  constructor(private router: Router, private http: Http, private sessionData: SessionDataService, private adminAuth: AdminAuthService) { }

  login(subject: string, study: string) {
    return this.http.post('/api/session/login', { subject: subject, study: study })
      .map((response: Response) => response.json().token )
      .do((token) => {
        this.token = token;
        const session = this.decodeSessionFromToken(token);
        this.setCurrentSession(session);
      })
      .take(1);
  }

  testRunLogin(study: string) {
    let headers = new Headers();
    headers.append('x-access-token', this.adminAuth.token);

    return this.http.post('/api/session/test-login',
      { subject: 'test', study: study }, { headers: headers })
      .map((response: Response) => response.json().token )
      .do((token) => {
        this.token = token;
        const session = this.decodeSessionFromToken(token);
        this.setCurrentSession(session);
      })
      .take(1);
  }

  logout() {
    this.loggedIn = false;
    this.currentSession = null;
    this.router.navigate(['/']);
  }

  decodeSessionFromToken(token) {
    return this.jwtHelper.decodeToken(token);
  }

  setCurrentSession(decodedSession) {
    this.loggedIn = true;
    const newSession = new SessionData(
      decodedSession.briefing,
      decodedSession.youtubeId,
      decodedSession.redirect,
      decodedSession.subject,
      decodedSession.study);
    this.sessionData.setSessionData(newSession);
  }

}
