// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
      'Content-Type': 'application/json',
    });

    // Ensure only the required fields are sent to the API
    const body = {
      email: credentials.email,
      password: credentials.password,
    };

    return this.http.post(url, body, { headers }).pipe(
      tap((res: any) => {
        if (res && res.token) {
          this.setToken(res.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  /**
   * Logout: intenta llamar al endpoint `/logout` de la API (si existe)
   * y siempre elimina el token del almacenamiento local.
   * ReqRes no provee logout real, así que la llamada puede fallar; aun así
   * limpiamos el token en el cliente.
   */
  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`;
    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, {}, { headers }).pipe(
      catchError(() => of(null)),
      tap(() => {
        localStorage.removeItem('auth_token');
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Error desconocido';
    if (error.error?.message) {
      message = error.error.message;
    } else if (error.error?.error) {
      message = error.error.error;
    } else if (error.status === 0) {
      message = 'No hay conexión con el servidor';
    }
    return throwError(() => message);
  }
}
