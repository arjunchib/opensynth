import { Injectable, OnInit, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DebuggerService } from '../debugger/debugger.service';

type Mode = 'normal' | 'wire';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  mode = new BehaviorSubject<Mode>('normal');

  private debuggerService = inject(DebuggerService);

  constructor() {
    this.mode.subscribe((value) => {
      if (value !== 'wire') this.debuggerService.clear();
    });
  }
}
