import { Component } from '@angular/core';
import { KnifeService } from '../../../../../services/knife/knife.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-couteauxadd',
  templateUrl: './couteauxadd.component.html',
  styleUrl: './couteauxadd.component.scss'
})
export class CouteauxaddComponent {
  couteau = {
    nom: '',
    prix: 0,
    texte: '',
    taille_lame: 0,
    images: [],
    categorie: 'cuisine'
  };
  selectedFiles: File[] = [];
  categories: string[] = ['Cuisine', 'Outdoor', 'Pliant', 'Exception'];
  selectedCategory: string = 'Cuisine';
  dropdownActive: boolean = false;

  constructor(private knifeService: KnifeService, private router: Router) {}

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  toggleDropdown(): void {
    this.dropdownActive = !this.dropdownActive;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.couteau.categorie = category;
    this.dropdownActive = false; // Ferme le dropdown après la sélection
  }

  onSubmit(): void {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append('nom', this.couteau.nom);
      formData.append('prix', this.couteau.prix.toString());
      formData.append('texte', this.couteau.texte);
      formData.append('taille_lame', this.couteau.taille_lame.toString());
      this.selectedFiles.forEach((file, index) => {
        formData.append('images', file, file.name);
      });
      formData.append('categorie', this.couteau.categorie);

      this.knifeService.addKnife(formData).subscribe(
        (response: any) => {
          console.log('Couteau ajouté avec succès', response);
          this.router.navigate(['/admin/couteaux']);
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout du couteau', error);
        }
      );
    }
  }

  navigateToList(): void {
    this.router.navigate(['/admin/couteaux']);
  }
}