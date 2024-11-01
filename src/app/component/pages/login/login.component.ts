import { Component } from '@angular/core';
import { AuthService } from '../../../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Login failed', error);
      }
    );
  }
}
