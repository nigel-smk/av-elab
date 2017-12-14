import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import {StudyModule} from './study/study.module';
import {AdminModule} from './admin/admin.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {WebRtcModule} from './web-rtc/web-rtc.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule.forRoot(),
    SharedModule.forRoot(),
    StudyModule.forRoot(),
    AdminModule.forRoot(),
    WebRtcModule.forRoot(),
    RoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
