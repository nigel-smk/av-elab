import {Component, HostBinding, HostListener, Input} from '@angular/core';

@Component({
  selector: 'app-play-button',
  template: `
    <i class="fa fa-play fa-2x"></i>
  `,
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent {

  @Input() spinDuration: number = 1;

  // TODO use angular animations
  @HostBinding('style.animation') animation: string;

  @HostListener('click', ['$event'])
  onClick(e) {
    // TODO sanitize cubic-bezier(0,.5,.5,1) and use it as timing function
    this.animation = `spin ${this.spinDuration}s ease-out`;
    setTimeout(() => {
      this.animation = undefined;
    }, this.spinDuration * 1000);
  }

}
