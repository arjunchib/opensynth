import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OscillatorNodeComponent } from './oscillator-node.component';

describe('OscillatorNodeComponent', () => {
  let component: OscillatorNodeComponent;
  let fixture: ComponentFixture<OscillatorNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OscillatorNodeComponent]
    });
    fixture = TestBed.createComponent(OscillatorNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
