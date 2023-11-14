import { TestBed } from '@angular/core/testing';

import { ContextService } from './arrow.service';

describe('ModeService', () => {
  let service: ContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
