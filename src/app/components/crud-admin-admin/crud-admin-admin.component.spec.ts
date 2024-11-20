import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAdminAdminComponent } from './crud-admin-admin.component';

describe('CrudAdminAdminComponent', () => {
  let component: CrudAdminAdminComponent;
  let fixture: ComponentFixture<CrudAdminAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudAdminAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudAdminAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
