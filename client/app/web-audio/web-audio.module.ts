import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AudioContextService} from './audio-context.service';
import {UserMediaService} from './user-media.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class WebAudioModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WebAudioModule,
      providers: [
        AudioContextService,
        UserMediaService
      ]
    };
  }
}
