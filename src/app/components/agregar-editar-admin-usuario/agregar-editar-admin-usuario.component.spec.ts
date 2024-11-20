import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarAdminUsuarioComponent } from './agregar-editar-admin-usuario.component';

describe('AgregarEditarAdminUsuarioComponent', () => {
  let component: AgregarEditarAdminUsuarioComponent;
  let fixture: ComponentFixture<AgregarEditarAdminUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarAdminUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarAdminUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
