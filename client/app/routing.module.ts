import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './study/not-found/not-found.component';
import {AvAccessComponent} from './study/av-access/av-access.component';
import {CalibrationComponent} from './study/calibration/calibration.component';
import {InvalidBrowserComponent} from './study/invalid-browser/invalid-browser.component';
import {BriefingComponent} from './study/briefing/briefing.component';
import {StimulusComponent} from './study/stimulus/stimulus.component';
import {AdminLoginComponent} from './admin/admin-login/admin-login.component';
import {InvalidBrowserGuardService} from './study/services/invalid-browser-guard.service';
import {EntryGuardService} from './study/services/entry-guard.service';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {StudiesComponent} from './admin/studies/studies.component';
import {SharesComponent} from './admin/shares/shares.component';
import {ActivityLogComponent} from './admin/activity-log/activity-log.component';

const routes: Routes = [
  // the empty path will always be redirected via the EntryGuardService
  { path: '', component: InvalidBrowserComponent, canActivate: [EntryGuardService] },
  { path: 'invalid-browser', component: InvalidBrowserComponent, canActivate: [InvalidBrowserGuardService]},
  { path: 'av-access', component: AvAccessComponent },
  { path: 'calibration', component: CalibrationComponent },
  { path: 'briefing', component: BriefingComponent },
  { path: 'stimulus', component: StimulusComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin', component: AdminDashboardComponent,
    children: [
      //{ path: '', redirectTo: 'studies', pathMatch: 'full' },
      { path: 'studies', component: StudiesComponent },
      { path: 'shares', component: SharesComponent },
      { path: 'activity', component: ActivityLogComponent }
    ]
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: false }) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
