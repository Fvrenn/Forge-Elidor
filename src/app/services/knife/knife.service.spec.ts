import { TestBed } from '@angular/core/testing';

import { KnifeService } from './knife.service';

describe('KnifeService', () => {
  let service: KnifeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnifeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
