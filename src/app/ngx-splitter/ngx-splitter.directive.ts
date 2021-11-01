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

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    console.log('dasdasd');
    this.setStyle();
  }

  setStyle() {
    const element = this.element.nativeElement as HTMLDivElement;
    element.style.setProperty(
      'cursor',
      this.direction === DirectionEnum.horizontal ? 'col-resize' : 'row-resize'
    );
    element.style.setProperty('width', '3px');
    element.style.setProperty('background-color', '#f8f9fa');
    element.style.setProperty('height', '100%');
  }
}
