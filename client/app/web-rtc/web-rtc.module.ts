import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AudioUploadService} from './services/audio-upload.service';
import {FrequencyDataService} from './services/frequency-data.service';
import {Mp3EncoderService} from './services/mp3-encoder.service';
import {PcmDataService} from './services/pcm-data.service';
import {UserMediaService} from './services/user-media.service';
import {VolumeDataService} from './services/volume-data.service';
import { WebRtcTestComponent } from './web-rtc-test/web-rtc-test.component';
import {WebRtcRoutingModule} from './web-rtc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WebRtcRoutingModule
  ],
  declarations: [WebRtcTestComponent]
})
export class WebRtcModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WebRtcModule,
      providers: [
        AudioUploadService,
        FrequencyDataService,
        Mp3EncoderService,
        PcmDataService,
        UserMediaService,
        VolumeDataService
      ]
    }
  }
}
