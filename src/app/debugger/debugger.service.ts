import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DebuggerService {
  private _points = new Set<[number, number]>();
  points = new BehaviorSubject<Set<[number, number]>>(this._points);

  add(x: number, y: number) {
    this._points.add([x, y]);
    this.points.next(this._points);
  }

  clear(x: number, y: number) {
    this._points.clear();
    this.points.next(this._points);
  }
}
