import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      if (state.url === '/' || state.url === '/login') {
        this.router.navigate(['/users']);
        return false;
      }
      return true;
    } else {
      if (state.url === '/login' || state.url === '/') {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }
  }
}
