import {ModuleWithProviders, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StudyDataService } from './services/study-data.service';
import {AuthService} from './services/auth.service';
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {PermissionsDataService} from './services/permissions-data.service';
import { ActionableComponent } from './actionable/actionable.component';
import {ButtonComponent} from './button/button.component';

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
    ActionableComponent,
    ButtonComponent
  ],
  declarations: [
    ActionableComponent,
    ButtonComponent,
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
        AuthGuardLogin
      ]
    }
  }
}
