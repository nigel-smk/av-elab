import { Component, OnInit } from '@angular/core';
import {AdminAuthService} from '../../shared/services/admin-auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private adminAuth: AdminAuthService) { }

  ngOnInit() {
  }

  logOut() {
    this.adminAuth.logout();
  }
}
