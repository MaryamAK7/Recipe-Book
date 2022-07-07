import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expireIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJ-7_qhSBoOCc0MfZdc9IQ2egN07HLH0U', {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>('', {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
    }
    return throwError(() => new Error(errorMessage));
  }
}
