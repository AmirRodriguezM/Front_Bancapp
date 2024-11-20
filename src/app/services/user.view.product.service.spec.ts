import { TestBed } from '@angular/core/testing';

import { UserViewProductService } from './user.view.product.service';

describe('UserViewProductService', () => {
  let service: UserViewProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserViewProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
