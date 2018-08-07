import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import {AdminAuthService} from '../../shared/services/admin-auth.service';
import {map} from 'rxjs/operators';

@Injectable()
export class EntryGuardService implements CanActivate {

  constructor(private router: Router, private location: Location, private auth: AuthService, private adminAuth: AdminAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // fetch queryParams
    const subject: string = route.queryParamMap.get('subject');
    const study: string = route.queryParamMap.get('study');

    // strip queryParams from url
    this.location.replaceState('');

    //demo mode
    if (!subject || !study) {
      // TODO set demo mode flag somewhere
      this.router.navigate(['/invalid-browser']);
      return false;
    }

    //test mode
    if (subject === 'test') {
      // TODO set test mode flag?
      // admin must be logged in to do test run
      if (!this.adminAuth.loggedIn) {
        this.router.navigate(['/api/admin/login']);
        return false;
      }
      return this.auth.testRunLogin(study).pipe(map(() => {
        this.router.navigate(['/invalid-browser']);
        return false;
      }, (err) => {
        this.router.navigate(['/login-failed']);
      }));
    }

    // login
    return this.auth.login(subject, study).pipe(map(() => {
      this.router.navigate(['/invalid-browser']);
      return false;
    }, (err) => {
      this.router.navigate(['/login-failed']);
    }));
  }
}
