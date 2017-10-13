import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {SharedModule} from '../shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudiesComponent } from './studies/studies.component';
import { SharesComponent } from './shares/shares.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    StudiesComponent,
    SharesComponent,
    ActivityLogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
