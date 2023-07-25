import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService) { }

  /*   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let isAuth = this.authService.isAuthenticated();
      if (!isAuth) {
        this.router.navigate(['/auth/login']);
      }
      else {
        return true;
      }
    } */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedKeys = next.data.allowedKeys;
    const isAuthorized = this.storageService.isAuthorized(allowedKeys);
    if (!isAuthorized) {
      this.storageService.signOut(state.url);
    }
    return isAuthorized;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedKeys = next.data.allowedKeys;
    const isAuthorized = this.storageService.isAuthorized(allowedKeys);
    if (!isAuthorized) {
      this.storageService.signOut(state.url);
    }
    return isAuthorized;
  }
}


