import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AcapService } from './acap.service';

describe('AcapService', () => {
  it('is provided at root', () => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    expect(TestBed.inject(AcapService)).toBeTruthy();
  });
});
