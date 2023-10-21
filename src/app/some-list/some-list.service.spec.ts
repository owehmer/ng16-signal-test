import { TestBed } from '@angular/core/testing';

import { SomeListService } from './some-list.service';

describe('SomeListService', () => {
  let service: SomeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SomeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
