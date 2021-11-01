import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';

export enum DirectionEnum {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

@Directive({
  selector: '[ngx-splitter]',
})
export class NgxSplitterDirective implements AfterViewInit, OnDestroy {
  @Input('direction') direction: DirectionEnum = DirectionEnum.horizontal;

  private handler = document.createElement('div');
  private leftSide: any;
  private rightSide: any;

  private handlerStartRef: any;

  private start = {};
  private end = {};

  constructor(private element: ElementRef) {
    this.handler.style.setProperty('height', '30px');
    this.handler.style.setProperty('width', '100%');
    this.handler.style.setProperty('background-color', '#dee2e6');
  }

  ngAfterViewInit() {
    const splitter = (this.element.nativeElement as HTMLDivElement).appendChild(
      this.handler
    );
    const leftSide = splitter.previousElementSibling as HTMLDivElement;
    const righSide = splitter.nextElementSibling as HTMLDivElement;

    this.setStyle();
    // handle start
    this.handlerStartRef = this.onHandlerStart.bind(this);
    this.handler.addEventListener('mousedown', this.handlerStartRef);
  }

  ngOnDestroy() {
    this.handler.removeEventListener('mousedown', this.handlerStartRef);
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

  private onHandlerStart() {}
}
