import { TestBed } from '@angular/core/testing';

import { HttpDataProgressService } from './http-data-progress.service';

describe('HttpDataProgressService', () => {
  let service: HttpDataProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDataProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
