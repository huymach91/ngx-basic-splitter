import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ngx-splitter]',
})
export class NgxSplitterDirective {
  @Input('direction') direction: 'vertical' | 'horizontal';

  constructor() {}
}
