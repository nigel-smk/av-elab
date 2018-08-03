import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-play-button',
  template: `
    <i class="fa fa-play fa-2x"></i>
  `,
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent implements OnInit {

  @Input() spinDuration: number = 1;
  @Input() src: string;

  private audioElement: HTMLAudioElement;

  // TODO use angular animations?
  @HostBinding('style.animation') animation: string;

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener('click', ['$event'])
  onClick(e) {
    this.audioElement.play();
    // TODO working around https://github.com/angular/angular/issues/8568
    this.animation = <any>this.sanitizer.bypassSecurityTrustStyle(`spin ${this.audioElement.duration}s cubic-bezier(0,.5,.5,1)`);
    setTimeout(() => {
      this.animation = undefined;
    }, this.audioElement.duration * 1000);
  }

  ngOnInit() {
    this.audioElement = new Audio(this.src);
  }

}
