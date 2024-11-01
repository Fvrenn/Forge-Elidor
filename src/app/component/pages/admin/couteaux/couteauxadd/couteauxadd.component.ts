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
    image: '',
    categorie: 'cuisine'
  };
  selectedFile: File | null = null;

  constructor(private knifeService: KnifeService, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('nom', this.couteau.nom);
      formData.append('prix', this.couteau.prix.toString());
      formData.append('texte', this.couteau.texte);
      formData.append('taille_lame', this.couteau.taille_lame.toString());
      formData.append('image', this.selectedFile, this.selectedFile.name);
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