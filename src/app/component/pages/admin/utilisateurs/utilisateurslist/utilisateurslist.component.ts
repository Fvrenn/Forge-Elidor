import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../services/user/user.service';

@Component({
  selector: 'app-utilisateurslist',
  templateUrl: './utilisateurslist.component.html',
  styleUrl: './utilisateurslist.component.scss'
})
export class UtilisateurslistComponent implements OnInit {
  users: any[] = [];
  isLoading = false;
  errorMessage = '';
  searchTerm = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
        this.errorMessage = 'Impossible de charger la liste des utilisateurs';
        this.isLoading = false;
      }
    );
  }

  navigateToAddUser(): void {
    this.router.navigate(['/admin/utilisateurs/add']);
  }

  navigateToEditUser(id: number): void {
    this.router.navigate(['/admin/utilisateurs/edit', id]);
  }

  deleteUser(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.isLoading = true;
      this.userService.deleteUser(id).subscribe(
        () => {
          this.users = this.users.filter(item => item.id !== id);
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
          this.errorMessage = 'Impossible de supprimer l\'utilisateur';
          this.isLoading = false;
        }
      );
    }
  }

  get filteredUsers(): any[] {
    return this.users.filter(item => 
      item.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      item.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}