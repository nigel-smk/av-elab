import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvAccessComponent} from './av-access/av-access.component';
import {BriefingComponent} from './briefing/briefing.component';
import {CalibrationComponent} from './calibration/calibration.component';
import {InvalidBrowserComponent} from './invalid-browser/invalid-browser.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {StimulusComponent} from './stimulus/stimulus.component';
import {MicCalibrationComponent} from './calibration/mic-calibration/mic-calibration.component';
import {MicMonitorComponent} from './calibration/mic-calibration/mic-monitor/mic-monitor.component';
import {SpeakerCalibrationComponent} from './calibration/speaker-calibration/speaker-calibration.component';
import {WebcamMonitorComponent} from './calibration/webcam-calibration/webcam-monitor/webcam-monitor.component';
import {WebcamCalibrationComponent} from './calibration/webcam-calibration/webcam-calibration.component';
import {EntryGuardService} from './services/entry-guard.service';
import {ImageCaptureService} from './services/image-capture.service';
import {InvalidBrowserGuardService} from './services/invalid-browser-guard.service';
import {PhaseGuardService} from './services/phase-guard.service';
import {SessionDataService} from './services/session-data.service';
import {SharedModule} from '../shared/shared.module';
import {YoutubePlayerModule} from 'ngx-youtube-player';
import {LoginFailureComponent} from './login-failure/login-failure.component';
import {CalibrationTemplateComponent} from './calibration/calibration-template/calibration-template.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    YoutubePlayerModule
  ],
  declarations: [
    AvAccessComponent,
    BriefingComponent,
    CalibrationComponent,
    CalibrationTemplateComponent,
    MicCalibrationComponent,
    MicMonitorComponent,
    WebcamCalibrationComponent,
    WebcamMonitorComponent,
    SpeakerCalibrationComponent,
    InvalidBrowserComponent,
    NotFoundComponent,
    StimulusComponent,
    LoginFailureComponent
  ],
  exports: [
    AvAccessComponent,
    BriefingComponent,
    CalibrationComponent,
    InvalidBrowserComponent,
    NotFoundComponent,
    StimulusComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudyModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StudyModule,
      providers: [
        EntryGuardService,
        ImageCaptureService,
        InvalidBrowserGuardService,
        PhaseGuardService,
        SessionDataService
      ]
    };
  }
}
