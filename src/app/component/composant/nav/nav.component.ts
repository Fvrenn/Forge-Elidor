import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  role: string = '';
  isDropdownOpen = false;
  telisOpen = false;


  // Bascule l'état du menu entre ouvert et fermé
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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
    this.telisOpen = !this.telisOpen;
  }
}