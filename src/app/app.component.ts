import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Forge-Elidor';

  showLayout: boolean = true;

  constructor(private router: Router) { }

  isAdminRoute(): boolean {
    // Vérifie si l'URL contient '/admin'
    return this.router.url.startsWith('/admin');
  }
}