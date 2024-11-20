import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CuentaAhorro } from '../interfaces/CuentaAhorro'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ProductsServicesService {
  private apiUrl = 'http://localhost:3000/api'; // Asegúrate de que la URL de tu API sea correcta

  constructor(private http: HttpClient) { }

  // Método para obtener todas las cuentas de ahorro
  obtenerCuentasAhorro(): Observable<CuentaAhorro[]> {
    return this.http.get<CuentaAhorro[]>(`${this.apiUrl}/obtenerCuenta`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear una nueva cuenta de ahorro
  createCuentaAhorro(cuentaData: Partial<CuentaAhorro>): Observable<CuentaAhorro> {
    return this.http.post<CuentaAhorro>(`${this.apiUrl}/crearCuenta`, cuentaData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para actualizar una cuenta de ahorro existente
  updateCuentaAhorro(id: number, cuentaData: Partial<CuentaAhorro>): Observable<CuentaAhorro> {
    return this.http.put<CuentaAhorro>(`${this.apiUrl}/actualizarCuenta/${id}`, cuentaData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para eliminar una cuenta de ahorro
  eliminarCuentaAhorro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminarCuenta/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores en las peticiones HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(() => new Error('Ocurrió un error en la solicitud. Inténtalo de nuevo más tarde.'));
  }
}
