
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { LOGIN_PAGE } from '../routes/auth-const-routes';
import { TOKEN_TYPE, UserResponse } from '../models/login-response';
const TOKEN_KEY = 'eserv-es-auth-token';
const REFRESH_TOKEN_KEY = 'eserv-es-auth-refresh_token';
const USER_KEY = 'eserv-es-auth-user';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  decodedToken: { [key: string]: string };
  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  signOut(returnUrl?: string): void {
    const user: UserResponse = this.getUser();
    if (user && user?.userId) {
      this.auth.logout(user.userId.toString()).subscribe((res) => {
        window.sessionStorage.clear();
        this.router.navigate([LOGIN_PAGE]);
      }, (err) => {
        this.toastr.error(err?.message);
      })
    } else {
      window.sessionStorage.clear();
      this.router.navigate([LOGIN_PAGE]);
    }

  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    /* const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    } */
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  public getPermissionKeys(): string[] {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      const parseUser = JSON.parse(user);
      const keys = parseUser.permissionKeys;
      if (keys && keys?.length > 0) {
        return keys;
      }
      return [];
    }
    return [];
  }

  decodeToken(tokenType: string) {
    const token = TOKEN_TYPE.token === tokenType ? this.getToken() : this.getRefreshToken();
    if (token) {
      try {
        jwt_decode(token);
      } catch (error) {
        //  this.router.navigate(["/"]);
        return true;
      }
      this.decodedToken = jwt_decode(token);
    }
  }

  getExpiryTime(tokenType: string) {
    this.decodeToken(tokenType);
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(tokenType: string): boolean {
    const expiryTime: number = +this.getExpiryTime(tokenType);
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }

  public isAuthorized(allowedPermissionKeys: string[]): boolean {
    // get user details
    const permissionKeys: string[] = this.getPermissionKeys();
    if (!permissionKeys || permissionKeys?.length === 0) {
      return false;
    }
    // check if the list of allowed keys is empty, if empty, authorize the user to access the page
    if (allowedPermissionKeys == null || allowedPermissionKeys.length === 0) {
      return true;
    }
    // check if key is matched or not
    return permissionKeys.some((role: string) => allowedPermissionKeys.includes(role));
  }
}
