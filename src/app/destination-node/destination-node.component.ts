import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from '../draggable/draggable.directive';

@Component({
  selector: 'app-destination-node',
  standalone: true,
  imports: [CommonModule, DraggableDirective],
  templateUrl: './destination-node.component.html',
  styleUrls: ['./destination-node.component.scss'],
})
export class DestinationNodeComponent {}
