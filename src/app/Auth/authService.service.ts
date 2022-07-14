import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, tap, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

import { Store } from '@ngrx/store';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap((response) => {
          this.handleAuth(response);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap((response) => {
          this.handleAuth(response);
        })
      );
  }
  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.LogOut());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpDate)
    );
    if (loadUser.token) {
      // this.user.next(loadUser);
      this.store.dispatch(
        new AuthActions.LogIn({
          email: loadUser.email,
          userId: loadUser.id,
          token: loadUser.token,
          expirationDate: new Date(userData._tokenExpDate),
        })
      );
      const expirationDuration =
        new Date(userData._tokenExpDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  handleAuth(dataRes: AuthResponse) {
    const expireDate = new Date(
      new Date().getTime() + +dataRes.expiresIn * 1000
    );
    const user = new User(
      dataRes.email,
      dataRes.localId,
      dataRes.idToken,
      expireDate
    );
    // this.user.next(user);
    this.store.dispatch(
      new AuthActions.LogIn({
        email: dataRes.email,
        userId: dataRes.localId,
        token: dataRes.idToken,
        expirationDate: expireDate,
      })
    );
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is incorrect';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
