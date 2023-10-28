import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DebuggerService {
  private _points = new Set<[number, number]>();
  points = new BehaviorSubject<Set<[number, number]>>(this._points);

  add(points: [number, number][]) {
    points.forEach((point) => this._points.add(point));
    this.points.next(this._points);
  }

  clear() {
    this._points.clear();
    this.points.next(this._points);
  }
}
