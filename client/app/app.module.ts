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
import {MicCalibrationComponent} from './calibration/mic-calibration/mic-calibration.component';
import {WebcamCalibrationComponent} from './calibration/webcam-calibration/webcam-calibration.component';
import {SpeakerCalibrationComponent} from './calibration/speaker-calibration/speaker-calibration.component';
import {WebcamMonitorComponent} from './calibration/webcam-calibration/webcam-monitor/webcam-monitor.component';
import {MicMonitorComponent} from './calibration/mic-calibration/mic-monitor/mic-monitor.component';
import {FrequencyDataService} from './services/frequency-data.service';
import {VolumeDataService} from './services/volume-data.service';

// TODO split the code into modules

@NgModule({
  declarations: [
    AppComponent,
    InvalidBrowserComponent,
    AvAccessComponent,
    CalibrationComponent,
    MicCalibrationComponent,
    MicMonitorComponent,
    WebcamCalibrationComponent,
    WebcamMonitorComponent,
    SpeakerCalibrationComponent,
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
    UserMediaService,
    FrequencyDataService,
    VolumeDataService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
