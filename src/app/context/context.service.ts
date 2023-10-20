import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Mode = 'normal' | 'wire';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  mode = new BehaviorSubject<Mode>('normal');
}
