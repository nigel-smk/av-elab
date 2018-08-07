import { Injectable } from '@angular/core';
import { demoData } from './demo-session-data';
import {SessionData} from '../../models/session-data';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class SessionDataService {

  private sessionData$: ReplaySubject<SessionData> = new ReplaySubject();

  constructor() {
    this.sessionData$.next(Object.assign({}, demoData));
  }

  get $() {
    return this.sessionData$.asObservable();
  }

  setSessionData(data: SessionData) {
    this.sessionData$.next(data);
  }

}
