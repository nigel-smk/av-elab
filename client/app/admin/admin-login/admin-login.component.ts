import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AdminAuthService} from '../../shared/services/admin-auth.service';


@Component({
  moduleId: module.id,
  templateUrl: 'admin-login.component.html'
})

export class AdminLoginComponent implements OnInit {
  error: { message: string };
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminAuth: AdminAuthService) { }

  ngOnInit() {
    // reset login status
    // this.adminAuth.logout();
  }

  login() {
    this.loading = true;
    this.adminAuth.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate(['/admin']);
        },
        error => {
          this.error = { message: 'Error: Username or password is incorrect' };
          this.loading = false;
        });
  }
}
