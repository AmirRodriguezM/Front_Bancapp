import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CuentaAhorro } from './../interfaces/CuentaAhorro'; 
import { Transaction } from './../interfaces/Transaction';

@Injectable({
  providedIn: 'root'
})
export class UserViewProductService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Método para obtener la cuenta de ahorro
  getCuentaAhorro(): Observable<CuentaAhorro> {
    return this.http.get<CuentaAhorro>(`${this.apiUrl}/miCuenta`).pipe(
      catchError(err => {
        console.error('Error al obtener la cuenta de ahorro:', err);
        return throwError(err);
      })
    );
  }

  // Método para obtener las transacciones por token
  getTransation(): Observable<Partial<Transaction>[]> {
    return this.http.get<{ success: boolean; historial: Transaction[] }>(`${this.apiUrl}/historialTransacciones`).pipe(
      map(response => response.historial.map(trans => ({
        tipo_transaccion: trans.tipo_transaccion,
        monto: trans.monto,
        fecha_transaccion: trans.fecha_transaccion,
        descripcion: trans.descripcion
      }))),
      catchError(err => {
        console.error('Error al obtener las transacciones', err);
        return throwError(err);
      })
    );
  }

  realizarDeposito(monto: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/miDeposito`, { monto }).pipe(
      catchError(err => {
        console.error('Error al realizar el depósito:', err);
        return throwError(err);
      })
    );
  }

  realizarRetiro(monto: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/miRetiro`, { monto }).pipe(
      catchError(err => {
        console.error('Error al realizar el retiro:', err);
        return throwError(err);
      })
    );
  }

  realizarTransferencia(monto: number, numero_cuenta_destino: string, codigo_verificacion: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/miTransferencia`, {
      monto,
      numero_cuenta_destino,
      codigo_verificacion
    }).pipe(
      catchError(err => {
        console.error('Error al realizar la transferencia:', err);
        return throwError(err);
      })
    );
}
   
}