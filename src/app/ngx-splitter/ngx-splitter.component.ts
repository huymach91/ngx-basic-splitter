import { Component, Input } from '@angular/core';

@Component({
  selector: '[ngx-splitter]',
  templateUrl: './ngx-splitter.component.html',
  styleUrls: ['./ngx-splitter.component.scss'],
})
export class NgxSplitterComponent {
  @Input('direction') direction: 'vertical' | 'horizontal';
}
