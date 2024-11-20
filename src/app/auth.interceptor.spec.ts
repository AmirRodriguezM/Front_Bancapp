import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let authInterceptor: AuthInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo para pruebas de HTTP
      providers: [
        AuthInterceptor // Proveer el interceptor
      ]
    });

    // Inyecta el interceptor y el controlador de pruebas HTTP
    authInterceptor = TestBed.inject(AuthInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden solicitudes pendientes
  });

  it('should be created', () => {
    expect(authInterceptor).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    // Crea una solicitud de prueba
    const testRequest = httpMock.expectOne('/api/test');

    // Simula la respuesta de la solicitud
    testRequest.flush({}); // Simula la respuesta de la solicitud

    // Verifica que la solicitud tenga el encabezado Authorization
    expect(testRequest.request.headers.has('Authorization')).toBeTrue();
  });
});
