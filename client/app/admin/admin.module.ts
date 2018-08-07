import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {SharedModule} from '../shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudiesComponent } from './studies/studies.component';
import { SharesComponent } from './shares/shares.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { AdminRoutingModule } from './admin-routing.module';
import { InstructionsModalComponent } from './studies/instructions-modal/instructions-modal.component';
import { DeleteModalComponent } from './studies/delete-modal/delete-modal.component';
import {AdminAuthService} from '../shared/services/admin-auth.service';
import {AdminAuthGuardService} from './services/admin-auth-guard.service';

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
    ActivityLogComponent,
    InstructionsModalComponent,
    DeleteModalComponent
  ],
  entryComponents: [
    InstructionsModalComponent,
    DeleteModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminModule,
      providers: [
        AdminAuthService,
        AdminAuthGuardService
      ]
    }
  }
}
