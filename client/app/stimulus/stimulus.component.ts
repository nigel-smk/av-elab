import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stimulus',
  templateUrl: './stimulus.component.html',
  styleUrls: ['./stimulus.component.css']
})
export class StimulusComponent implements OnInit {

  player: YT.Player;
  public id = 'OoA4017M7WU';
  // TODO fetch from environment
  public playerVars = {
    autoplay: 1,
    html5: 1,
    theme: 'light',
    color: 'white',
    iv_load_policy: 3,
    showinfo: 0,
    controls: 0,
    fs: 0,
    modestBranding: 1,
    rel: 0,
    disablekb: 0
  };

  constructor() { }

  ngOnInit() {
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

}
