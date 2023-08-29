import { TestBed } from '@angular/core/testing';

import { AllSerService } from './all-ser.service';

describe('AllSerService', () => {
  let service: AllSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
