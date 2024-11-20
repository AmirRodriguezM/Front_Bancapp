import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAdminProductComponent } from './crud-admin-product.component';

describe('CrudAdminProductComponent', () => {
  let component: CrudAdminProductComponent;
  let fixture: ComponentFixture<CrudAdminProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudAdminProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudAdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
