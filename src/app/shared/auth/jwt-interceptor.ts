import { AUTH_TOKEN } from 'app/shared/config/constants/auth-constant';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AuthService } from './auth.service';
import { LOGIN_PAGE } from '../routes/auth-const-routes';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { RefreshTokenResponse, TOKEN_TYPE } from '../models/login-response';
import { LoaderService } from '../services/loader.service';
const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /*  constructor(
     private storageService: StorageService
   ) { }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     const accessToken = this.storageService.getSession(AUTH_TOKEN.TOKEN);
     // add authorization header with jwt token if available
     if (accessToken) {
       req = req.clone({
         url:  req.url,
         setHeaders: {
           Authorization: `Bearer ${accessToken}`
         }
       });
     }
     return next.handle(req);
   }
 }
  */
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private loader: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    const spinnerSubscription = this.loader.spinner$.subscribe();
    let authReq = req;
    const token = this.storageService.getToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes(LOGIN_PAGE) && error.status === 401) {
        return this.handle401Error(authReq, next);
      }
      return throwError(error);
    }), finalize(() => spinnerSubscription.unsubscribe()));
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.storageService.getRefreshToken();
      const isRefreshTokenExpired = this.storageService.isTokenExpired(TOKEN_TYPE.tokenType);
      if (token && !isRefreshTokenExpired) {
        return this.authService.refreshToken(token).pipe(
          switchMap((token: RefreshTokenResponse) => {
            this.isRefreshing = false;
            this.storageService.saveToken(token.access_token);
            this.refreshTokenSubject.next(token.access_token);

            return next.handle(this.addTokenHeader(request, token.access_token));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.storageService.signOut();
            return throwError(err);
          })
        );
      } else {
        this.isRefreshing = false;
        this.storageService.signOut();
        return throwError("err");
      }
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
  private addTokenHeader(request: HttpRequest<any>, token: string) {
    //  console.log(request?.url?.substring(request?.url?.indexOf("/") + 1));
    if (request?.url?.split('/')[request?.url?.split('/')?.length - 1] !== "refresh-token") {
      return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return request.clone();
  }
}
