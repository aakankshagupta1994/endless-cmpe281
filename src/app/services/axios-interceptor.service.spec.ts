import { TestBed } from '@angular/core/testing';

import { AxiosInterceptorService } from './axios-interceptor.service';

describe('AxiosInterceptorService', () => {
  let service: AxiosInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxiosInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
