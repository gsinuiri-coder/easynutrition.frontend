import { TestBed } from '@angular/core/testing';

import { HttpDataCustomerService } from './http-data-customer.service';

describe('HttpDataCustomerService', () => {
  let service: HttpDataCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDataCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
