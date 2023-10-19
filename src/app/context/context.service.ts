import { Injectable } from '@angular/core';

type Mode = 'normal' | 'wire';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  mode: Mode = 'normal';
}
