import { TestBed } from '@angular/core/testing';

import { Breakpoint } from './breakpoint';

describe('Breakpoint', () => {
  let service: Breakpoint;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Breakpoint);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
