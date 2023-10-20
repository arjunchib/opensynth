import {
  Component,
  HostBinding,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OscillatorNodeComponent } from './oscillator-node/oscillator-node.component';
import { DestinationNodeComponent } from './destination-node/destination-node.component';
import { ContextService } from './context/context.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    OscillatorNodeComponent,
    DestinationNodeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'h-screen w-screen block overflow-visible',
  },
})
export class AppComponent implements OnInit {
  title = 'opensynth';
  volume = 1;
  audioContext!: AudioContext;
  oscNode!: OscillatorNode;
  gainNode!: GainNode;

  private contextService = inject(ContextService);

  @HostBinding('style.transform') transform = 'translate(0)';
  @HostBinding('style.transform-origin') transformOrigin = 'top left';
  left = 0;
  top = 0;
  scale = 1;
  offsetX = 0;
  offsetY = 0;
  preScaleLeft = 0;
  preScaleTop = 0;
  preScaleScale = 1;

  ngOnInit(): void {
    this.audioContext = new AudioContext();
    this.oscNode = new OscillatorNode(this.audioContext, {
      frequency: 380,
      type: 'square',
    });
    this.gainNode = new GainNode(this.audioContext);
    this.gainNode.gain.setValueAtTime(0, 0);
    this.oscNode.connect(this.gainNode).connect(this.audioContext.destination);
  }

  start() {
    this.oscNode.start();
  }

  stop() {
    this.oscNode.stop();
  }

  onKeyDown() {
    const attack = 0.1;
    const decay = 0.2;
    const sustain = 0.5;
    const time = this.audioContext.currentTime;
    this.gainNode.gain.linearRampToValueAtTime(this.volume, time + attack);
    this.gainNode.gain.linearRampToValueAtTime(sustain, time + attack + decay);
  }

  onKeyUp() {
    const release = 0.8;
    const time = this.audioContext.currentTime;
    this.gainNode.gain.linearRampToValueAtTime(0, time + release);
  }

  private setTransform() {
    this.transform = `translate(${this.left}px, ${this.top}px) scale(${this.scale})`;
  }

  @HostListener('window:mousemove', ['$event']) mmove(e: MouseEvent) {
    this.offsetX = e.clientX;
    this.offsetY = e.clientY;
  }

  @HostListener('window:mousewheel', ['$event']) move(e: WheelEvent) {
    e.preventDefault();
    if (e.ctrlKey) {
      console.log(e.deltaY);
    }
    this.left -= e.deltaX;
    this.top -= e.deltaY;
    this.setTransform();
  }

  @HostListener('window:keydown.space') reset() {
    this.left = 0;
    this.top = 0;
    this.setTransform();
  }

  @HostListener('window:keydown.w') w() {
    this.contextService.mode.next('wire');
  }

  @HostListener('window:keydown.escape') esc() {
    this.contextService.mode.next('normal');
  }

  @HostListener('window:gesturechange', ['$event']) gestureMove(e: any) {
    e.preventDefault();
    this.scaler(e);
  }

  @HostListener('window:gesturestart', ['$event']) gestureStart(e: any) {
    e.preventDefault();
    this.preScaleLeft = this.left;
    this.preScaleTop = this.top;
    this.preScaleScale = this.scale;
    this.scaler(e);
  }

  @HostListener('window:gestureend', ['$event']) gestureEnd(e: Event) {
    e.preventDefault();
  }

  private scaler(e: any) {
    this.scale = this.preScaleScale * e.scale;
    const left = this.preScaleLeft;
    const top = this.preScaleTop;
    const x1 = this.offsetX - left;
    this.left = left + x1 * (1 - e.scale);
    const y1 = this.offsetY - top;
    this.top = top + y1 * (1 - e.scale);
    this.setTransform();
  }
}
