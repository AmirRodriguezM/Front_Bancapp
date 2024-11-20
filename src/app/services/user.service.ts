import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { user } from '../interfaces/user'; 
import { JwtRes } from '../interfaces/jwtres'; 
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  addEditUser(user: user) {
    throw new Error('Method not implemented.');
  }

  private myAppURL: string;
  private myApiURL: string;
  private myApiURLlogin: string;

  // Comportamiento del usuario autenticado
  authSubject = new BehaviorSubject(false);
  private token: string | null = '';

  constructor(private http: HttpClient) {
    this.myAppURL = 'http://localhost:3000/';
    this.myApiURL = 'api/signup/';  
    this.myApiURLlogin = 'api/login/';
  }

  // Método para crear un nuevo usuario
  createUser(user: user): Observable<any> {
    return this.http.post(`${this.myAppURL}${this.myApiURL}`, user);
  }

  // Método para iniciar sesión
  login(user: user): Observable<JwtRes> {
    return this.http.post<JwtRes>(`${this.myAppURL}${this.myApiURLlogin}`, user).pipe(
      tap((res: JwtRes) => {
        console.log("Respuesta de login:", res); 
        if (res && res.token) {
          this.saveToken(res.token); 
        } else {
          console.error('La respuesta de login no contiene un token');
        }
      })
    );
  }

  // Método para guardar el token en el local storage
  private saveToken(token: string) {
    localStorage.setItem('ACCESS_TOKEN', token);
    this.token = token; // Guarda el token en la variable

    // Decodifica el token y almacena el tiempo de expiración en segundos
    const decoded: any = jwtDecode(token);
    const exp = decoded.exp; // Mantiene `exp` en segundos
    localStorage.setItem('EXPIRES_IN', exp.toString()); // Almacena el tiempo de expiración en segundos
  }

  // Método para obtener el token actual
  private getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const expString = localStorage.getItem('EXPIRES_IN') || '0';
    const exp = parseInt(expString); 
    return !!this.getToken() && Date.now() < exp * 1000; 
  }
}
