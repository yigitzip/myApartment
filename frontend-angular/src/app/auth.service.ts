import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `http://localhost:8080/Auth`; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };
    return this.http.post(`${this.apiUrl}/login`, loginRequest, { responseType: 'json' }) 
      .pipe(catchError(this.handleError));
  }
  

  
  register(username: string, password: string, apartmentName: string): Observable<any> {
    const registerRequest = { username, password, apartmentName };
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest)  
      .pipe(catchError(this.handleError));
  }

  // Hata işleme metodu
  private handleError(error: HttpErrorResponse) {
    // Hata detaylarını logla
    console.error('An error occurred', error);
    if (error.error instanceof ErrorEvent) {
      // İstemci hatası (network error gibi)
      console.error('Client-side error:', error.error.message);
    } else {
      // Sunucu hatası (backend'den gelen yanıt)
      console.error('Server-side error:', error.status, error.error);
    }
    return throwError(() => new Error('Something went wrong'));
  }
  
}
