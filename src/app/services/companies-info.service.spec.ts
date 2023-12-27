import { TestBed } from '@angular/core/testing';

import { CompaniesInfoService } from './companies-info.service';

describe('CompaniesInfoService', () => {
  let service: CompaniesInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniesInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
