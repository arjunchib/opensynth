import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Arrow } from './arrow.model';

@Injectable({
  providedIn: 'root',
})
export class ArrowService {
  private _arrows = new Set<Arrow>();
  arrows = new BehaviorSubject<Set<Arrow>>(this._arrows);

  add(arrow: Arrow) {
    this._arrows.add(arrow);
    this.arrows.next(this._arrows);
  }
}
