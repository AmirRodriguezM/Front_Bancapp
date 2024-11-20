import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarClientUsuarioComponent } from './agregar-editar-client-usuario.component';

describe('AgregarEditarClientUsuarioComponent', () => {
  let component: AgregarEditarClientUsuarioComponent;
  let fixture: ComponentFixture<AgregarEditarClientUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarClientUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarClientUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
