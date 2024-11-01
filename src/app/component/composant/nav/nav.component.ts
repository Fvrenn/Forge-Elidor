import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  role: string = '';
  isDropdownOpen = false;
  telisOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }
  // Bascule l'état du menu entre ouvert et fermé
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
  // Ferme le menu
  closeMenu() {
    this.isMenuOpen = false;
    this.telisOpen = false;
  }


  openDropdown() {
    this.isDropdownOpen = true;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
  toggleDropdown() {
    if (window.innerWidth <= 1024) {
      this.telisOpen = !this.telisOpen;
    }
  }
}