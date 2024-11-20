import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserAdminServicesService } from '../../services/user.admin.services.service';

interface ApiResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-agregar-editar-client-usuario',
  templateUrl: './agregar-editar-client-usuario.component.html',
  styleUrls: ['./agregar-editar-client-usuario.component.css']
})
export class AgregarEditarClientUsuarioComponent implements OnInit {
  clientForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userAdminServicesService: UserAdminServicesService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AgregarEditarClientUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Inicializar el formulario con validaciones
    this.clientForm = this.fb.group(
      {
        nombre_usuario: ['', Validators.required],
        apellido_usuario: ['', Validators.required],
        nombre_ingreso_usuario: ['', Validators.required],
        clave_ingreso_usuario: ['', [Validators.required, Validators.minLength(6)]],
        confirmar_clave_ingreso_usuario: ['', Validators.required],
        estado_usuario: [true, Validators.required],
        id_rol: [1] 
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit(): void {
    // Inicializar con datos si se proporciona (modo de edición)
    if (this.data) {
      this.clientForm.patchValue(this.data);
    }
  }

  // Validación personalizada para confirmar que las contraseñas coincidan
  private passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('clave_ingreso_usuario')?.value;
    const confirmPassword = form.get('confirmar_clave_ingreso_usuario')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Guardar el usuario del cliente
  saveClientUser(): void {
    if (this.clientForm.invalid) {
      this.toastr.error('Por favor, completa todos los campos requeridos', 'Error');
      return;
    }

    this.loading = true;
    const clientData = this.clientForm.value;
    delete clientData.confirmar_clave_ingreso_usuario; 

    this.userAdminServicesService.createUser(clientData).subscribe({
      next: (response: ApiResponse) => {
        this.loading = false;
        if (response.success) {
          this.toastr.success('Cliente registrado exitosamente', 'Éxito');
          this.dialogRef.close(response); 
        } else {
          this.toastr.error('No se pudo registrar el cliente', 'Error');
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al registrar el cliente:', err);
        this.toastr.error('Error al registrar el cliente', 'Error');
      }
    });
  }

  // Cerrar el modal sin guardar
  onCancel(): void {
    this.dialogRef.close();
  }
}
