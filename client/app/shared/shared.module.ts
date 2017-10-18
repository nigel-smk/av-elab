import {ModuleWithProviders, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StudyDataService } from './services/study-data.service';
import {AuthService} from './services/auth.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {PermissionsDataService} from './services/permissions-data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    // Shared Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // Shared Components
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        StudyDataService,
        PermissionsDataService,
        AuthService,
        AuthGuardAdmin,
        AuthGuardLogin
      ]
    }
  }
}
