import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Importa jwt-decode

@Component({
  selector: 'app-view-dashboard-admin',
  templateUrl: './view-dashboard-admin.component.html',
  styleUrls: ['./view-dashboard-admin.component.css']
})
export class ViewDashboardAdminComponent {

  isCollapsed = false;  // Variable que controla el estado del menú
  nombreUsuario: string = '';  // Variable para almacenar el nombre de usuario
  apellidoUsuario: string = '';  // Variable para almacenar el apellido de usuario

  constructor(private router: Router) {
    this.decodeToken(); // Llama a decodeToken al inicializar el componente
  }

  // Método para alternar el estado del menú
  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
    console.log("Menu isCollapsed:", this.isCollapsed);  // Verificar el estado en la consola
}

  // Método para determinar el ícono del botón
  getToggleIcon() {
    return this.isCollapsed ? 'image/anadir.png' : 'image/menos.png';
  }

  // Método para cerrar sesión y eliminar el token
  logout() {
    localStorage.removeItem('ACCESS_TOKEN'); // Elimina el token de acceso
    localStorage.removeItem('EXPIRES_IN');    // Elimina el tiempo de expiración
    this.router.navigate(['/login']);          // Redirige a la página de login
  }  

  // Método para decodificar el token y obtener datos de usuario
  decodeToken() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.nombreUsuario = decodedToken.nombre_usuario;
        this.apellidoUsuario = decodedToken.apellido_usuario;
      } catch (error) {
        console.error('Error decodificando el token:', error);
      }
    }
  }
}
