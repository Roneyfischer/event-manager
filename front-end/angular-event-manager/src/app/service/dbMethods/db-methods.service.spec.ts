import { TestBed } from '@angular/core/testing';

import { DbMethodsService } from './db-methods.service';

describe('DbMethodsService', () => {
  let service: DbMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
