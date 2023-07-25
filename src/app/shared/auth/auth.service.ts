import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { environment } from 'environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(public router: Router, private http: HttpClient) {
  }
  getUserId(): string {
    return '45';
  }
  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signInUser(data: { email: string, password: string }): Observable<LoginResponse> {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post<LoginResponse>(environment.E_SERVICE_AUTH + "auth/be/user-login", JSON.stringify(data), this.httpOptions).pipe(catchError(this.errorHandler));

  }
  refreshToken(token: string) {
    return this.http.post(environment.E_SERVICE_AUTH + 'auth/refresh-token', {
      token: token
    }, this.httpOptions);
  }
  /*******
   * error handel for all services
   * ***
   */
  logout(userId: string) {
    return this.http.post<any>(environment.E_SERVICE_AUTH + "auth/be/user-logout/" + userId, {}, this.httpOptions).pipe(catchError(this.errorHandler));
  }
  errorHandler(error) {
    let errorMessage = '';
    let errorRes = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      errorRes = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorRes = `${error.error.message} `;
    }
    return throwError(errorRes);
  }
}
