import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from '../draggable/draggable.directive';
import { WireableDirective } from '../wireable/wireable.directive';

@Component({
  selector: 'app-oscillator-node',
  standalone: true,
  imports: [CommonModule, DraggableDirective, WireableDirective],
  templateUrl: './oscillator-node.component.html',
  styleUrls: ['./oscillator-node.component.scss'],
})
export class OscillatorNodeComponent {}
