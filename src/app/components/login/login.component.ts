import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { user } from '../../interfaces/user'; 
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { JwtRes } from '../../interfaces/jwtres';
import {jwtDecode} from 'jwt-decode'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variables de usuario basadas en la interfaz User
  id: number | null = null;
  nombre_usuario: string = '';
  apellido_usuario: string = '';
  nombre_ingreso_usuario: string = '';
  clave_ingreso_usuario: string = '';
  estado_usuario: string = '';
  id_rol: number | null = null;
  id_admin_permiso: number | null = null;
  id_cuenta_ahorro: number | null = null;
  UsuarioRol: { rol: string } | null = null; 

  // Variable para controlar el estado de carga
  isLoading: boolean = false;

  constructor(
    private toastr: ToastrService, 
    private _userServices: UserService, 
    private router: Router
  ) {}

  login() {
    // Validar si el usuario ya está autenticado
    if (this._userServices.isAuthenticated()) {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userRole = decodedToken.id_rol;

        this.toastr.info('Ya estás autenticado. Redirigiendo...', 'Información');
        if (userRole === 2) {
          this.router.navigate(['/dashboardAdmin']);
        } else if (userRole === 1) {
          this.router.navigate(['/dashboardUser']);
        } else {
          this.toastr.error('Rol de usuario desconocido', 'Error');
        }
        return;
      }
    }

    // Validar campos de entrada
    if (this.nombre_ingreso_usuario.trim() === '' || this.clave_ingreso_usuario.trim() === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Iniciar el spinner de carga
    this.isLoading = true;

    const user: user = {
      id: this.id,
      nombre_usuario: this.nombre_usuario,
      apellido_usuario: this.apellido_usuario,
      nombre_ingreso_usuario: this.nombre_ingreso_usuario,
      clave_ingreso_usuario: this.clave_ingreso_usuario,
      estado_usuario: this.estado_usuario,
      id_rol: this.id_rol,
      id_admin_permiso: this.id_admin_permiso,
      id_cuenta_ahorro: this.id_cuenta_ahorro, 
      UsuarioRol: this.UsuarioRol 
    };

    this._userServices.login(user).subscribe({
      next: (data: JwtRes) => {
        this.isLoading = false;

        if (data.token) {
          this.toastr.success('Inicio de sesión exitoso', 'Éxito');
          localStorage.setItem('ACCESS_TOKEN', data.token);

          const decodedToken: any = jwtDecode(data.token);
          const userRole = decodedToken.id_rol;

          if (userRole === 2) {
            this.router.navigate(['/dashboardAdmin']);
          } else if (userRole === 1) {
            this.router.navigate(['/dashboardUser']);
          } else {
            this.toastr.error('Rol de usuario desconocido', 'Error');
          }
        } else {
          this.toastr.error('Error al recibir el token', 'Error');
        }
      },
      error: error => {
        this.isLoading = false;
        this.handleError(error);
      }
    });
  }

  private handleError(error: any) {
    if (error.status === 0) {
      this.toastr.error('No se pudo conectar con el servidor. Asegúrate de que el servidor esté encendido.', 'Error de conexión');
    } else if (error.status === 400) {
      this.toastr.error(error.error.error || 'Solicitud incorrecta', 'Error');
    } else if (error.status === 401) {
      this.toastr.error(error.error.error || 'El usuario o contraseña son incorrectos', 'Error');
    } else if (error.status === 403) {
      this.toastr.error(error.error.error || 'El usuario no está activo. Contacte al administrador.', 'Error');
    } else if (error.status === 404) {
      this.toastr.error('Ruta no encontrada', 'Error');
    } else if (error.status === 500) {
      this.toastr.error('Ha ocurrido un error en el servidor. Asegúrate de que el backend esté encendido.', 'Error del servidor');
    } else {
      this.toastr.error('Ocurrió un error desconocido. Por favor, intenta nuevamente más tarde.', 'Error');
    }
    console.log(error);
  }

  ngOnInit(): void {}
}
