import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryGuardService implements CanActivate {

  constructor(private router: Router, private location: Location, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // fetch queryParams
    const session: string = route.queryParamMap.get('session');
    const study: string = route.queryParamMap.get('study');

    // strip queryParams from url
    this.location.replaceState('');

    // login
    return this.auth.login(session, study).map(() => {

      this.router.navigate(['/invalid-browser']);

      // resolve route guard to false
      return false;
    });
  }
}
