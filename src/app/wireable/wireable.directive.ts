import {
  Directive,
  HostBinding,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ContextService } from '../context/context.service';
import { Subject, takeUntil } from 'rxjs';

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
  @HostBinding('class') class: string[] = [];

  private contextService = inject(ContextService);
  private readonly destroy = new Subject<void>();

  ngOnInit(): void {
    this.contextService.mode
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        this.class = value === 'wire' ? WIRE_CLASSES : [];
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
