import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {SessionDataService} from '../../study/services/session-data.service';
import {SessionData} from '../../models/session-data';
import {AdminAuthService} from './admin-auth.service';
import * as jwtDecode from 'jwt-decode';
import {take, tap, map} from 'rxjs/internal/operators';

@Injectable()
export class AuthService {
  // TODO demo behaviour and test behaviour

  // TODO use dedicated JWT decoding library
  loggedIn = false;
  token = '';
  currentSession: SessionData;

  constructor(private router: Router, private http: Http, private sessionData: SessionDataService, private adminAuth: AdminAuthService) { }

  login(subject: string, study: string) {
    return this.http.post('/api/session/login', { subject: subject, study: study }).pipe(
      map((response: Response) => response.json().token ),
      tap((token: string) => {
        this.token = token;
        const session = this.decodeSessionFromToken(token);
        this.setCurrentSession(session);
      }),
      take(1)
    );
  }

  testRunLogin(study: string) {
    let headers = new Headers();
    headers.append('x-access-token', this.adminAuth.token);

    return this.http.post('/api/session/test-login',
      { subject: 'test', study: study }, { headers: headers }).pipe(
      map((response: Response) => response.json().token ),
      tap((token: string) => {
        this.token = token;
        const session = this.decodeSessionFromToken(token);
        this.setCurrentSession(session);
      }),
      take(1)
    );
  }

  logout() {
    this.loggedIn = false;
    this.currentSession = null;
    this.router.navigate(['/']);
  }

  decodeSessionFromToken(token) {
    return jwtDecode(token);
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
