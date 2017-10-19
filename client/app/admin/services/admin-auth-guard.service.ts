import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AdminAuthService} from '../../shared/services/admin-auth.service';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private adminAuth: AdminAuthService, private router: Router) { }

  canActivate() {

    if (!this.adminAuth.loggedIn) {
      this.router.navigate(['/admin/login']);
      return false;
    }

    return true;
  }

}
