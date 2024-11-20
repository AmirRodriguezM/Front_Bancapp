import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAdminUserComponent } from './crud-admin-user.component';

describe('CrudAdminUserComponent', () => {
  let component: CrudAdminUserComponent;
  let fixture: ComponentFixture<CrudAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudAdminUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
