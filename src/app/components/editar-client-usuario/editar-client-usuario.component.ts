import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserAdminServicesService } from '../../services/user.admin.services.service';

interface ApiResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-editar-client-usuario',
  templateUrl: './editar-client-usuario.component.html',
  styleUrls: ['./editar-client-usuario.component.css']
})
export class EditarClientUsuarioComponent implements OnInit {
  editForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userAdminServicesService: UserAdminServicesService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditarClientUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    // Inicializar el formulario con valores y validaciones
    this.editForm = this.fb.group(
      {
        nombre_usuario: [data.nombre_usuario || '', Validators.required],
        apellido_usuario: [data.apellido_usuario || '', Validators.required],
        nombre_ingreso_usuario: [data.nombre_ingreso_usuario || '', Validators.required],
        clave_ingreso_usuario: ['', Validators.minLength(6)], 
        confirmar_clave_ingreso_usuario: [''], 
        estado_usuario: [data.estado_usuario?.toLowerCase() === 'activo' ? 'activo' : 'inactivo', Validators.required],
        id_cuenta_ahorro: [data.id_cuenta_ahorro || '', Validators.required],
      },
      { validators: this.passwordsMatchValidator } 
    );
  }

  ngOnInit(): void {}

  // Validación personalizada para verificar que las contraseñas coincidan
  passwordsMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
    const password = form.get('clave_ingreso_usuario')?.value;
    const confirmPassword = form.get('confirmar_clave_ingreso_usuario')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Guardar los cambios del usuario
  saveEditUser(): void {
    if (this.editForm.invalid) {
      this.toastr.error('Por favor, completa todos los campos requeridos', 'Error');
      return;
    }

    this.loading = true;
    const clientData = this.editForm.value;

    // Transformar estado_usuario a 'activo' o 'inactivo' en minúsculas
    clientData.estado_usuario = clientData.estado_usuario.toLowerCase() === 'activo' ? 'activo' : 'inactivo';

    // Remover `clave_ingreso_usuario` si está vacío para evitar cambios no intencionados
    if (!clientData.clave_ingreso_usuario) {
      delete clientData.clave_ingreso_usuario;
    } else {
      delete clientData.confirmar_clave_ingreso_usuario;
    }

    // Llamada para editar usuario existente
    this.userAdminServicesService.editUserClient(this.data.id, clientData).subscribe({
      next: (response: ApiResponse) => {
        this.loading = false;
        if (response.success) {
          this.toastr.success('Usuario actualizado exitosamente', 'Éxito');
          this.dialogRef.close(response); 
        } else {
          this.toastr.warning(response.message, 'Aviso');
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al editar usuario:', err);

        // Manejo de errores específicos según el mensaje devuelto por el backend
        if (err.error && err.error.message) {
          switch (err.error.message) {
            case "Usuario no encontrado":
              this.toastr.error("Usuario no encontrado", "Error");
              break;
            case "La tarjeta de ahorros ya está asignada a otro usuario":
              this.toastr.error("La tarjeta de ahorros ya está asignada a otro usuario", "Error");
              break;
            case "No se realizaron cambios ya que los datos son los mismos":
              this.toastr.info("No se realizaron cambios ya que los datos son los mismos", "Aviso");
              break;
            default:
              this.toastr.error("Error interno del servidor", "Error");
          }
        } else {
          this.toastr.error("Error al actualizar el usuario", "Error");
        }
      }
    });
  }

  // Cerrar el modal sin guardar
  onCancel(): void {
    this.dialogRef.close();
  }
}
