import { TestBed } from '@angular/core/testing';

import { SomeListDataService } from './some-list-data.service';

describe('SomeListDataService', () => {
  let service: SomeListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SomeListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
