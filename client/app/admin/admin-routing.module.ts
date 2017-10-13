import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {StudiesComponent} from './studies/studies.component';
import {SharesComponent} from './shares/shares.component';
import {ActivityLogComponent} from './activity-log/activity-log.component';

const adminRoutes: Routes = [
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin', component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'studies', pathMatch: 'full' },
      { path: 'studies', component: StudiesComponent },
      { path: 'shares', component: SharesComponent },
      { path: 'activity', component: ActivityLogComponent }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(adminRoutes) ],
  exports: [ RouterModule ]
})

export class AdminRoutingModule {}
