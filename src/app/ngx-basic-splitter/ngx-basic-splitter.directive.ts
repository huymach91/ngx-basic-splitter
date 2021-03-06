import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

export enum DirectionEnum {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

@Directive({
  selector: '[ngx-basic-splitter]',
})
export class NgxBasicSplitterDirective
  implements AfterViewInit, OnDestroy, OnInit
{
  @Input('direction') direction: DirectionEnum = DirectionEnum.horizontal;
  // left of the splitter element
  @Input('horizontalLeftWidth') horizontalLeftWidth: number = 20;
  @Input('verticalLeftHeight') verticalLeftHeight: number = 20;
  // thick of splitter handler
  @Input('handlerSize') handlerSize: number = 5; // px

  private parentElement: any;
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
    leftHeight: 0,
  };
  public isMouseDown: boolean = false;

  constructor(private element: ElementRef) {
    this.handler.style.setProperty('cursor', 'pointer');
    this.handler.style.setProperty('background-color', '#dee2e6');
  }

  ngOnInit() {
    this.handler.style.setProperty(
      'cursor',
      this.direction === DirectionEnum.horizontal ? 'col-resize' : 'row-resize'
    );
  }

  ngAfterViewInit() {
    const splitter = this.element.nativeElement as HTMLDivElement;
    splitter.appendChild(this.handler);

    this.parentElement = splitter.parentElement;
    this.parentElement.style.setProperty('width', '100%');

    this.leftSide = splitter.previousElementSibling as HTMLDivElement;
    this.rightSide = splitter.nextElementSibling as HTMLDivElement;

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
    element.style.setProperty('background-color', '#f8f9fa');

    this.parentElement.style.setProperty('display', 'flex');

    this.leftSide.style.setProperty('border', '1px solid #ccc');
    this.leftSide.style.setProperty('min-width', '30px');
    this.leftSide.style.setProperty('min-height', '30px');

    this.rightSide.style.setProperty('border', '1px solid #ccc');
    this.rightSide.style.setProperty('min-width', '30px');
    this.rightSide.style.setProperty('min-height', '30px');

    switch (this.direction) {
      case DirectionEnum.horizontal:
        // parent element
        this.parentElement.style.setProperty('flex-direction', 'row');
        // splitter
        element.style.setProperty('width', this.handlerSize + 'px');
        element.style.setProperty('height', '100%');
        // left and right side's default width
        this.leftSide.style.setProperty(
          'width',
          this.horizontalLeftWidth + '%'
        );
        this.rightSide.style.setProperty(
          'width',
          100 - this.horizontalLeftWidth + '%'
        );
        // handler
        this.handler.style.setProperty('height', '30px');
        this.handler.style.setProperty('width', '100%');
        break;
      case DirectionEnum.vertical:
        // parent element
        this.parentElement.style.setProperty('flex-direction', 'column');
        // splitter
        element.style.setProperty('height', this.handlerSize + 'px');
        element.style.setProperty('width', '100%');
        element.style.setProperty('justify-content', 'center');
        // left side's default width
        this.leftSide.style.setProperty(
          'height',
          this.verticalLeftHeight + '%'
        );
        this.rightSide.style.setProperty(
          'height',
          100 - this.verticalLeftHeight + '%'
        );
        // handler
        this.handler.style.setProperty('width', '30px');
        this.handler.style.setProperty('height', '100%');
        break;
    }
  }

  public onHandlerStart(event: any) {
    this.isMouseDown = true;
    this.start.clientX = event.clientX;
    this.start.clientY = event.clientY;
    this.start.leftWidth = this.leftSide.getBoundingClientRect().width;
    this.start.leftHeight = this.leftSide.getBoundingClientRect().height;
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

    this.leftSide.style.userSelect = 'none';
    this.leftSide.style.pointerEvents = 'none';

    this.rightSide.style.userSelect = 'none';
    this.rightSide.style.pointerEvents = 'none';

    const dx = event.clientX - this.start.clientX;
    const dy = event.clientY - this.start.clientY;

    switch (this.direction) {
      case DirectionEnum.horizontal:
        const newLeftWidth = (
          ((this.start.leftWidth + dx) * 100) /
          parentRect.width
        ).toFixed(0);

        this.leftSide.style.setProperty(
          'width',
          newLeftWidth + '%',
          'important'
        );
        this.rightSide.style.setProperty(
          'width',
          'calc(100% - ' + newLeftWidth + '%)',
          'important'
        );
        break;
      case DirectionEnum.vertical:
        const newLeftHeight = (
          ((this.start.leftHeight + dy) * 100) /
          parentRect.height
        ).toFixed(0);

        this.leftSide.style.setProperty(
          'height',
          'calc(' + newLeftHeight + '%' + ' - ' + this.handlerSize + 'px' + ')',
          'important'
        );
        this.rightSide.style.setProperty(
          'height',
          'calc(100% - ' +
            newLeftHeight +
            '% - ' +
            this.handlerSize +
            'px' +
            ')',
          'important'
        );
        break;
    }
  }

  public onHandlerEnd(event: any) {
    this.isMouseDown = false;

    this.leftSide.style.removeProperty('user-select');
    this.leftSide.style.removeProperty('pointer-events');

    this.rightSide.style.removeProperty('user-select');
    this.rightSide.style.removeProperty('pointer-events');

    document.removeEventListener('mousemove', this.handlerMoveRef);
    document.removeEventListener('mouseup', this.handlerEndRef);
  }
}
