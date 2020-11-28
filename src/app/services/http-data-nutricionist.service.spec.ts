import { TestBed } from '@angular/core/testing';

import { HttpDataNutricionistService } from './http-data-nutricionist.service';

describe('HttpDataNutricionistService', () => {
  let service: HttpDataNutricionistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDataNutricionistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
