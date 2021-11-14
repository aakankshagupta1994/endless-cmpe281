import { TestBed } from '@angular/core/testing';

import { AuthorizationGuardGuard } from './authorization-guard.guard';

describe('AuthorizationGuardGuard', () => {
  let guard: AuthorizationGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizationGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
