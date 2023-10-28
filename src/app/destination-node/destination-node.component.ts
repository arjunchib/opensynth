import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from '../draggable/draggable.directive';
import { WireableDirective } from '../wireable/wireable.directive';

@Component({
  selector: 'app-destination-node',
  standalone: true,
  imports: [CommonModule, DraggableDirective, WireableDirective],
  templateUrl: './destination-node.component.html',
  styleUrls: ['./destination-node.component.scss'],
})
export class DestinationNodeComponent {}
