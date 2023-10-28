import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
} from '@angular/core';
import { ContextService } from '../context/context.service';

@Directive({
  selector: '[appDraggable]',
  standalone: true,
})
export class DraggableDirective {
  @HostBinding('class.absolute') absolute = true;
  @HostBinding('class.select-none') selectNone = true;
  @HostBinding('class') class: string[] = [];
  @HostBinding('style.left.px') left = this.el.nativeElement.clientLeft;
  @HostBinding('style.top.px') top = this.el.nativeElement.clientTop;
  dragging?: [number, number];

  private contextService = inject(ContextService);

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousedown', ['$event']) onMouseDown(e: MouseEvent) {
    if (this.contextService.mode.value !== 'normal') return;
    this.dragging = [e.clientX - this.left, e.clientY - this.top];
    this.class = ['shadow-xl', 'transition-dragging', '-translate-y-0.5'];
  }

  @HostListener('mouseup', ['$event']) onMouseUp(e: MouseEvent) {
    this.dragging = undefined;
    this.class = [];
  }

  @HostListener('window:mousemove', ['$event']) onMouseMove(e: MouseEvent) {
    if (!this.dragging) return;
    this.left = e.clientX - this.dragging[0];
    this.top = e.clientY - this.dragging[1];
  }
}
