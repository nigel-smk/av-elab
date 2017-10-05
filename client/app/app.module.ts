import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {AuthService} from './services/auth.service';
import {AvAccessComponent} from './av-access/av-access.component';
import {CalibrationComponent} from './calibration/calibration.component';
import {InvalidBrowserComponent} from './invalid-browser/invalid-browser.component';
import {BriefingComponent} from './briefing/briefing.component';
import {StimulusComponent} from './stimulus/stimulus.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {InvalidBrowserGuardService} from './services/invalid-browser-guard.service';
import {EntryGuardService} from './services/entry-guard.service';
import {PhaseGuardService} from './services/phase-guard.service';
import {UserMediaService} from './services/user-media.service';

@NgModule({
  declarations: [
    AppComponent,
    InvalidBrowserComponent,
    AvAccessComponent,
    CalibrationComponent,
    BriefingComponent,
    StimulusComponent,
    AdminLoginComponent,
    NotFoundComponent
  ],
  imports: [
    RoutingModule,
    SharedModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    InvalidBrowserGuardService,
    EntryGuardService,
    PhaseGuardService,
    UserMediaService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
