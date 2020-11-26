import { TestBed } from '@angular/core/testing';

import { HttpDataDietService } from './http-data-diet.service';

describe('HttpDataDietService', () => {
  let service: HttpDataDietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDataDietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
