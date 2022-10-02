import { TestBed } from '@angular/core/testing';

import { MeetServiceService } from './meet-service.service';

describe('MeetServiceService', () => {
  let service: MeetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
