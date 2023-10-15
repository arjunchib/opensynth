import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'opensynth';
  volume = 1;
  audioContext!: AudioContext;
  oscNode!: OscillatorNode;
  gainNode!: GainNode;

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
}
