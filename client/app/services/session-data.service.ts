import { Injectable } from '@angular/core';
import { demoData } from './demo-session-data';
import {SessionData} from '../../models/session-data';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class SessionDataService {

  private sessionData$: ReplaySubject<SessionData> = new ReplaySubject(1);

  constructor() { }

  get $() {
    return this.sessionData$.asObservable();
  }

  fetchSessionData() {
    // if user is demo user
    this.sessionData$.next(Object.assign({}, demoData));
  }

}
