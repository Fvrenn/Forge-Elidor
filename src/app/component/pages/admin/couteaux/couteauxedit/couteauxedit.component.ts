import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KnifeService } from '../../../../../services/knife/knife.service';

@Component({
  selector: 'app-couteauxedit',
  templateUrl: './couteauxedit.component.html',
  styleUrl: './couteauxedit.component.scss'
})
export class CouteauxeditComponent implements OnInit {
  couteau: any = {
    nom: '',
    prix: 0,
    texte: '',
    taille_lame: 0,
    image: '',
    categorie: 'cuisine'
  };
  selectedFile: File | null = null;
  categories: string[] = ['Cuisine', 'Outdoor', 'Pliant', 'Exception'];
  selectedCategory: string = 'Cuisine';
  dropdownActive: boolean = false;

  constructor(
    private knifeService: KnifeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.knifeService.getKnifeById(+id).subscribe(
        (data: any) => {
          this.couteau = data;
          this.selectedCategory = this.couteau.categorie;
        },
        (error: any) => {
          console.error('Failed to fetch knife', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  toggleDropdown(): void {
    this.dropdownActive = !this.dropdownActive;
  }

 

  onSubmit(): void {
    const formData = new FormData();
    formData.append('nom', this.couteau.nom);
    formData.append('prix', this.couteau.prix.toString());
    formData.append('texte', this.couteau.texte);
    formData.append('taille_lame', this.couteau.taille_lame.toString());
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    formData.append('categorie', this.couteau.categorie);

    this.knifeService.updateKnife(this.couteau.id, formData).subscribe(
      (response: any) => {
        console.log('Couteau mis à jour avec succès', response);
        this.router.navigate(['/admin/couteaux']);
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour du couteau', error);
      }
    );
  }
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.couteau.categorie = category;
    this.dropdownActive = false;
  }
  navigateToList(): void {
    this.router.navigate(['/admin/couteaux']);
  }
}