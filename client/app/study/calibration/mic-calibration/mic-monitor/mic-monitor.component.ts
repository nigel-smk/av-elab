import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';

import * as D3Scale from 'd3-scale';
import * as D3ScaleChromatic from 'd3-scale-chromatic';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-mic-monitor',
  templateUrl: './mic-monitor.component.html',
  styleUrls: ['./mic-monitor.component.css']
})
export class MicMonitorComponent implements AfterViewInit, OnDestroy {

  @Input() volumeData$: Observable<number>;
  @ViewChild('micmonitor') canvas: ElementRef;
  private context: CanvasRenderingContext2D;
  private radius = 100;
  private maxObservedVolume = 0;
  private colourScale = D3Scale.scaleLinear().domain([0, 255]).range([0, 1]);
  private radiusScale = D3Scale.scaleLinear().domain([0, 255]).range([10, this.radius]);

  private subscription: Subscription;

  public loaded = false;

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d');

    this.subscription = this.volumeData$.subscribe((volumeData: number) => {
      this.loaded = true;
      this.maxObservedVolume = Math.max(this.maxObservedVolume, volumeData);
      this.draw(volumeData);
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  draw(data) {
    const context = this.context;
    const radius = this.radius;
    this.canvas.nativeElement.width = radius * 2;
    this.canvas.nativeElement.height = radius * 2;

    // clear canvas
    context.clearRect(0, 0, radius * 2, radius * 2);

    // draw live feedback circle
    const liveColour = D3ScaleChromatic.interpolateRdYlGn(this.colourScale(data));
    context.beginPath();
    const liveRadius = this.radiusScale(data);
    context.arc(radius, radius, liveRadius, 0, 2 * Math.PI);
    context.fillStyle = liveColour;
    context.fill();

    // draw goal volume circle
    context.beginPath();
    context.arc(radius, radius, radius, 0, 2 * Math.PI);
    context.strokeStyle = 'black';
    context.stroke();

    // draw current max volume circle
    const maxColour = D3ScaleChromatic.interpolateRdYlGn(this.colourScale(this.maxObservedVolume));
    context.beginPath();
    const maxRadius = this.radiusScale(this.maxObservedVolume);
    context.arc(radius, radius, maxRadius, 0, 2 * Math.PI);
    context.strokeStyle = maxColour;
    context.stroke();
  }

}
