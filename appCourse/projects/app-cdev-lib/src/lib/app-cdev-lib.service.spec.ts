import { TestBed } from '@angular/core/testing';

import { AppCDevLibService } from './app-cdev-lib.service';

describe('AppCDevLibService', () => {
  let service: AppCDevLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCDevLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
