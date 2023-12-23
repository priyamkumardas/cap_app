import { TestBed } from '@angular/core/testing';

import { RescuerGuard } from './rescuer.guard';

describe('RescuerGuard', () => {
  let guard: RescuerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RescuerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
