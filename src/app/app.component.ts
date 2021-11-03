import { Component } from '@angular/core';
import { DirectionEnum } from './ngx-splitter/ngx-splitter.directive';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  directionEnum = DirectionEnum;
}
