import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationNodeComponent } from './destination-node.component';

describe('DestinationNodeComponent', () => {
  let component: DestinationNodeComponent;
  let fixture: ComponentFixture<DestinationNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DestinationNodeComponent]
    });
    fixture = TestBed.createComponent(DestinationNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
