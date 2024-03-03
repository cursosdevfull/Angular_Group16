import { TestBed } from '@angular/core/testing';

import { ProductSignalService } from './product-signal.service';

describe('ProductSignalService', () => {
  let service: ProductSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
