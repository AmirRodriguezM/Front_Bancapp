import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClientUsuarioComponent } from './editar-client-usuario.component';

describe('EditarClientUsuarioComponent', () => {
  let component: EditarClientUsuarioComponent;
  let fixture: ComponentFixture<EditarClientUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarClientUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarClientUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
