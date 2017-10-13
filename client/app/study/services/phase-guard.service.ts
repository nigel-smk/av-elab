import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class PhaseGuardService implements CanActivate {

  private phaseOrder: string[] = ['av-access', 'calibration', 'briefing', 'stimulus'];

  constructor(private router: Router) { }

  canActivate() {
    // TODO enforce order of phase access
    return true;
  }
}
