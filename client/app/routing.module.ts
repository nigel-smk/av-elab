import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import {AvAccessComponent} from './av-access/av-access.component';
import {CalibrationComponent} from './calibration/calibration.component';
import {InvalidBrowserComponent} from './invalid-browser/invalid-browser.component';
import {BriefingComponent} from './briefing/briefing.component';
import {StimulusComponent} from './stimulus/stimulus.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'invalid-browser', pathMatch: 'full' },
  { path: 'invalid-browser', component: InvalidBrowserComponent},
  { path: 'av-access', component: AvAccessComponent },
  { path: 'calibration', component: CalibrationComponent },
  { path: 'briefing', component: BriefingComponent },
  { path: 'stimulus', component: StimulusComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
