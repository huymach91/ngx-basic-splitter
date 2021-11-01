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
  private handlerMoveRef: any;
  private handlerEndRef: any;

  private start = {
    clientX: 0,
    clientY: 0,
    leftWidth: 0,
  };
  public isMouseDown: boolean = false;

  constructor(private element: ElementRef) {
    this.handler.style.setProperty('height', '30px');
    this.handler.style.setProperty('width', '100%');
    this.handler.style.setProperty('cursor', 'pointer');
    this.handler.style.setProperty('background-color', '#dee2e6');
    this.handler.style.setProperty(
      'cursor',
      this.direction === DirectionEnum.horizontal ? 'col-resize' : 'row-resize'
    );
  }

  ngAfterViewInit() {
    const splitter = this.element.nativeElement as HTMLDivElement;
    splitter.appendChild(this.handler);

    this.leftSide = splitter.previousElementSibling as HTMLDivElement;
    this.rightSide = splitter.nextElementSibling as HTMLDivElement;

    this.leftSide.style.userSelect = 'none';
    this.leftSide.style.pointerEvents = 'none';

    this.rightSide.style.userSelect = 'none';
    this.rightSide.style.pointerEvents = 'none';

    this.setStyle();
    // handler: start
    this.handlerStartRef = this.onHandlerStart.bind(this);
    this.handlerMoveRef = this.onHandlerMove.bind(this);
    this.handlerEndRef = this.onHandlerEnd.bind(this);

    this.handler.addEventListener('mousedown', this.handlerStartRef);
  }

  ngOnDestroy() {
    this.handler.removeEventListener('mousedown', this.handlerStartRef);
    document.removeEventListener('mousemove', this.handlerMoveRef);
    document.removeEventListener('mouseup', this.handlerEndRef);
  }

  setStyle() {
    const element = this.element.nativeElement as HTMLDivElement;
    element.style.setProperty('display', 'flex');
    element.style.setProperty('align-items', 'center');
    element.style.setProperty('width', '3px');
    element.style.setProperty('background-color', '#f8f9fa');
    element.style.setProperty('height', '100%');
  }

  public onHandlerStart(event: any) {
    this.isMouseDown = true;
    this.start.clientX = event.clientX;
    this.start.clientY = event.clientY;
    this.start.leftWidth = this.leftSide.getBoundingClientRect().width;
    // handler: move
    document.addEventListener('mousemove', this.handlerMoveRef);
    // handler: end
    document.addEventListener('mouseup', this.handlerEndRef);
  }

  public onHandlerMove(event: any) {
    if (!this.isMouseDown) return;
    const parent = (this.element.nativeElement as HTMLDivElement)
      .parentElement as HTMLDivElement;
    const parentRect = parent.getBoundingClientRect();

    const dx = event.clientX - this.start.clientX;
    const dy = event.clientY - this.start.clientY;
    const newLeftWidth = (
      ((this.start.leftWidth + dx) * 100) /
      parentRect.width
    ).toFixed(2);

    this.leftSide.style.setProperty('width', newLeftWidth + 'px', '!important');
  }

  public onHandlerEnd(event: any) {
    this.isMouseDown = false;
    console.log('mouse up', this.isMouseDown);
    document.removeEventListener('mousemove', this.handlerMoveRef);
    document.removeEventListener('mouseup', this.handlerEndRef);
  }
}
