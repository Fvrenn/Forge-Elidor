import { Component } from '@angular/core';
import { AuthService } from '../../../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register({ nom: this.nom, prenom: this.prenom, email: this.email, password: this.password }).subscribe(
      (response: any) => {
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Registration failed', error);
      }
    );
  }
}
