import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as bowser from 'bowser';

@Injectable()
export class InvalidBrowserGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const valid = bowser.check({chrome: '53.0'}, true) as boolean;

    if (valid) {
      this.router.navigate(['/av-access']);
    }

    return !valid;
  }
}
