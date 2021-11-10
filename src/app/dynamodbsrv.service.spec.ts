import { TestBed } from '@angular/core/testing';

import { DynamodbsrvService } from './dynamodbsrv.service';

describe('DynamodbsrvService', () => {
  let service: DynamodbsrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamodbsrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
