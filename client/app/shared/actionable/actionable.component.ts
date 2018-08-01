import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-actionable',
  template: `
      <div class="header" [ngClass]="getHeaderType()">
        <ng-content select="header" ></ng-content>
      </div>
      <div class="body" [ngClass]="getBodyType()">
        <ng-content select="body"></ng-content>
      </div>
  `,
  styleUrls: ['./actionable.component.scss']
})
export class ActionableComponent {

  // TODO try using hostbinding https://juristr.com/blog/2016/01/learning-ng2-dynamic-styles/#using-host-and-hostbinding

  @Input() type: string;

  public getHeaderType() {
    switch (this.type) {
      case 'info':
        return 'header--info';
      case 'success':
        return 'header--success';
      case 'danger':
        return 'header--danger';
      default:
        return null;
    }
  }

  public getBodyType() {
    switch (this.type) {
      case 'info':
        return 'body--info';
      case 'success':
        return 'body--success';
      case 'danger':
        return 'body--danger';
      default:
        return null;
    }
  }

}
