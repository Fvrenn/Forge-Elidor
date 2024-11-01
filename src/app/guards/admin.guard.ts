import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.role.pipe(
      map(role => {
        if (role === 'admin') {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}