import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import {AvAccessComponent} from './av-access/av-access.component';
import {CalibrationComponent} from './calibration/calibration.component';
import {InvalidBrowserComponent} from './invalid-browser/invalid-browser.component';
import {BriefingComponent} from './briefing/briefing.component';
import {StimulusComponent} from './stimulus/stimulus.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {InvalidBrowserGuardService} from './services/invalid-browser-guard.service';
import {EntryGuardService} from './services/entry-guard.service';

const routes: Routes = [
  // the empty path will always be redirected via the EntryGuardService
  { path: '', component: InvalidBrowserComponent, canActivate: [EntryGuardService] },
  { path: 'invalid-browser', component: InvalidBrowserComponent, canActivate: [InvalidBrowserGuardService]},
  { path: 'av-access', component: AvAccessComponent },
  { path: 'calibration', component: CalibrationComponent },
  { path: 'briefing', component: BriefingComponent },
  { path: 'stimulus', component: StimulusComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: false }) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
