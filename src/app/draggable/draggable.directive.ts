import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true,
})
export class DraggableDirective {
  @HostBinding('class.absolute') absolute = true;
  @HostBinding('class.select-none') selectNone = true;
  @HostBinding('style.left.px') left = this.el.nativeElement.clientLeft;
  @HostBinding('style.top.px') top = this.el.nativeElement.clientTop;
  dragging?: [number, number];

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousedown', ['$event']) onMouseDown(e: MouseEvent) {
    this.dragging = [e.clientX - this.left, e.clientY - this.top];
  }

  @HostListener('mouseup', ['$event']) onMouseUp(e: MouseEvent) {
    this.dragging = undefined;
  }

  @HostListener('window:mousemove', ['$event']) onMouseMove(e: MouseEvent) {
    if (!this.dragging) return;
    this.left = e.clientX - this.dragging[0];
    this.top = e.clientY - this.dragging[1];
  }
}
