import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserAdminServicesService } from '../../services/user.admin.services.service';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

interface ApiResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-agregar-editar-admin-usuario',
  templateUrl: './agregar-editar-admin-usuario.component.html',
  styleUrls: ['./agregar-editar-admin-usuario.component.css']
})
export class AgregarEditarAdminUsuarioComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _userServices: UserAdminServicesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id_usuario: [null],
      nombre_usuario: ['', Validators.required],
      apellido_usuario: ['', Validators.required],
      nombre_ingreso_usuario: ['', Validators.required],
      clave_ingreso_usuario: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      estado_usuario: ['', Validators.required],
      id_rol: [null],
      id_admin_permiso: [null],
      tipo_usuario: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    return form.get('clave_ingreso_usuario')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data.id_usuario;

    if (this.isEditMode) {
      this.form.patchValue({
        id_usuario: this.data.id_usuario,
        nombre_usuario: this.data.nombre_usuario,
        apellido_usuario: this.data.apellido_usuario,
        nombre_ingreso_usuario: this.data.nombre_ingreso_usuario,
        estado_usuario: this.data.estado_usuario,
        id_rol: this.data.id_rol,
        id_admin_permiso: this.data.id_admin_permiso,
        tipo_usuario: this.data.tipo_usuario
      });
    }

    this.form.get('clave_ingreso_usuario')?.updateValueAndValidity();
    this.form.get('confirmPassword')?.updateValueAndValidity();
  }

  addEditUsuarioAdmin() {
    if (this.form.invalid) {
      this.toastr.error('Por favor, completa todos los campos obligatorios', 'Error');
      return;
    }

    const formValues = this.form.value;

    if (formValues.tipo_usuario === 'administrador') {
      formValues.id_rol = 2;
      formValues.id_admin_permiso = 1;
    } else {
      formValues.id_rol = 1;
      formValues.id_admin_permiso = null;
    }

    this.isLoading = true;

    if (this.isEditMode) {
      this._userServices.editUser(this.data.id_usuario, formValues).subscribe(
        (response: ApiResponse) => {
          this.toastr.success(response.message, 'Éxito');
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error('Error al editar usuario', 'Error');
          this.isLoading = false;
        }
      );
    } else {
      this._userServices.createUser(formValues).subscribe(
        (response: ApiResponse) => {
          this.toastr.success(response.message, 'Éxito');
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error('Error al crear usuario', 'Error');
          this.isLoading = false;
        }
      );
    }
  }
}
