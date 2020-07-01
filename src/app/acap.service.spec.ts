import { TestBed } from '@angular/core/testing';

import { AcapService } from './acap.service';

describe('AcapService', () => {
  let service: AcapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
