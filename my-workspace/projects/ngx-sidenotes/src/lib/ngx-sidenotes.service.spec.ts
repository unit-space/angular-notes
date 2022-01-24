import { TestBed } from '@angular/core/testing';

import { NgxSidenotesService } from './ngx-sidenotes.service';

describe('NgxSidenotesService', () => {
  let service: NgxSidenotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSidenotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
