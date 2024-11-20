import { TestBed } from '@angular/core/testing';

import { UserAdminServicesService } from './user.admin.services.service';

describe('UserAdminServicesService', () => {
  let service: UserAdminServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAdminServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
