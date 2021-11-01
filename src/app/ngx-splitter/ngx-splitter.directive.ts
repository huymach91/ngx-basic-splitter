import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

export enum DirectionEnum {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

@Directive({
  selector: '[ngx-splitter]',
})
export class NgxSplitterDirective implements AfterViewInit {
  @Input('direction') direction: DirectionEnum = DirectionEnum.horizontal;

  private handler = document.createElement('div');

  constructor(private element: ElementRef) {
    this.handler.style.setProperty('height', '30px');
    this.handler.style.setProperty('width', '100%');
    this.handler.style.setProperty('background-color', '#dee2e6');
  }

  ngAfterViewInit() {
    (this.element.nativeElement as HTMLDivElement).appendChild(this.handler);
    this.setStyle();
  }

  setStyle() {
    const element = this.element.nativeElement as HTMLDivElement;
    element.style.setProperty(
      'cursor',
      this.direction === DirectionEnum.horizontal ? 'col-resize' : 'row-resize'
    );
    element.style.setProperty('display', 'flex');
    element.style.setProperty('align-items', 'center');
    element.style.setProperty('width', '3px');
    element.style.setProperty('background-color', '#f8f9fa');
    element.style.setProperty('height', '100%');
  }
}
