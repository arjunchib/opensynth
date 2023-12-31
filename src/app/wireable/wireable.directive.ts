import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ContextService } from '../context/context.service';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';
import { DebuggerService } from '../debugger/debugger.service';
import { ArrowService } from '../arrow/arrow.service';

const WIRE_CLASSES = [
  'hover:outline-2',
  'hover:outline',
  'hover:outline-blue-500',
  'transition-[outline]',
];

@Directive({
  selector: '[appWireable]',
  standalone: true,
})
export class WireableDirective implements OnInit, OnDestroy {
  static click = new Subject<ElementRef<HTMLDivElement>>();

  @HostBinding('class') class: string[] = [];

  private el: ElementRef<HTMLDivElement> = inject(ElementRef);
  private contextService = inject(ContextService);
  private debuggerService = inject(DebuggerService);
  private arrowService = inject(ArrowService);
  private active = false;

  private readonly destroy = new Subject<void>();

  ngOnInit(): void {
    this.watchMode();
    this.watchClicks();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  @HostListener('click') click() {
    WireableDirective.click.next(this.el);
  }

  private watchClicks() {
    WireableDirective.click
      .pipe(takeUntil(this.destroy))
      .subscribe((el) => (this.active = this.el !== el));
  }

  private watchMode() {
    this.contextService.mode
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        this.class = value === 'wire' ? WIRE_CLASSES : [];
        if (value === 'wire') {
          this.debuggerService.add(this.points);
        }
      });
  }

  private get points(): [number, number][] {
    const x0 = this.el.nativeElement.offsetLeft;
    const x1 = x0 + this.el.nativeElement.offsetWidth;
    const y0 = this.el.nativeElement.offsetTop;
    const y1 = y0 + this.el.nativeElement.offsetHeight;
    return [
      ...this.splitBy(x0, x1, 5).map((x) => [x, y0]),
      ...this.splitBy(x0, x1, 5).map((x) => [x, y1]),
      ...this.splitBy(y0, y1, 5).map((y) => [x0, y]),
      ...this.splitBy(y0, y1, 5).map((y) => [x1, y]),
    ] as [number, number][];
  }

  private splitBy(start: number, end: number, steps: number) {
    const values = [];
    const step = (end - start) / steps;
    for (let i = start; i <= end; i += step) {
      values.push(i);
    }
    return values;
  }
}
