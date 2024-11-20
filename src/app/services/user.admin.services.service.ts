import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminPermiso } from '../interfaces/useradmin';

@Injectable({
  providedIn: 'root'
})
export class UserAdminServicesService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Fetch permissions (already implemented)
  getPermisosUsuarios(): Observable<AdminPermiso[]> {
    return this.http.post<AdminPermiso[]>(`${this.apiUrl}/consultarPermisosUsuarios`, {}).pipe(
      catchError(err => {
        console.error('Error en la solicitud:', err);
        return throwError(err);
      })
    );
  }

  // Create user
  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crearUsuario`, userData).pipe(
      catchError(err => {
        console.error('Error al crear usuario:', err);
        return throwError(err);
      })
    );
  }

  // Edit user
  editUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editarUsuario/${id}`, userData).pipe(
      catchError(err => {
        console.error('Error al editar usuario:', err);
        return throwError(err);
      })
    );
  }

  // Delete user
  deleteUser(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/eliminarUsuario/${id}`).pipe(
      catchError(err => {
        console.error('Error al eliminar usuario:', err);
        return throwError(err);
      })
    );
  }

  // New method: Get clients
  getClientes(): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/consultarUsuariosClientes`, {}).pipe(
      catchError(err => {
        console.error('Error al obtener clientes:', err);
        return throwError(err);
      })
    );
  }
  // Edit client user
  editUserClient(id: number, clientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editarUsuarioCliente/${id}`, clientData).pipe(
      catchError(err => {
        console.error('Error al editar usuario cliente:', err);
        return throwError(err);
      })
    );
  }

  // Delete client user
  deleteUserClient(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/eliminarUsuarioCliente/${id}`).pipe(
      catchError(err => {
        console.error('Error al eliminar usuario cliente:', err);
        return throwError(err);
      })
    );
  }
}
