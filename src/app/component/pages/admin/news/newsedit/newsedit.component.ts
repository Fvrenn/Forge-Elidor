import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../../../services/news/news.service';

@Component({
  selector: 'app-newsedit',
  templateUrl: './newsedit.component.html',
  styleUrl: './newsedit.component.scss'
})
export class NewseditComponent implements OnInit {
  newsId: number = 0;
  news = {
    titre: '',
    date_publication: '',
    contenu: '',
    image: ''
  };
  
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.newsId = +idParam;
      this.loadNewsDetails();
    } else {
      this.errorMessage = 'ID de l\'actualité non spécifié';
      setTimeout(() => this.navigateToList(), 2000);
    }
  }

  loadNewsDetails(): void {
    this.isLoading = true;
    this.newsService.getNewsById(this.newsId).subscribe(
      (data: any) => {
        this.news = data;
        // Convertir la date au format YYYY-MM-DD pour le champ input date
        if (this.news.date_publication) {
          const date = new Date(this.news.date_publication);
          this.news.date_publication = date.toISOString().split('T')[0];
        }
        
        // Prévisualisation de l'image existante
        if (this.news.image) {
          this.previewImage = `http://localhost:5000/${this.news.image}`;
        }
        
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Erreur lors du chargement de l\'actualité', error);
        this.errorMessage = 'Impossible de charger les détails de l\'actualité';
        this.isLoading = false;
      }
    );
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    const formData = new FormData();
    
    // Mapper les noms des champs du modèle vers les noms attendus par l'API
    formData.append('title', this.news.titre);
    formData.append('publicationDate', this.news.date_publication);
    formData.append('content', this.news.contenu);
    
    // Ajouter l'image seulement si une nouvelle a été sélectionnée
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.newsService.updateNews(this.newsId, formData).subscribe(
      (response: any) => {
        console.log('Actualité mise à jour avec succès', response);
        this.isLoading = false;
        this.router.navigate(['/admin/news']);
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour de l\'actualité', error);
        this.errorMessage = 'Une erreur est survenue lors de la mise à jour de l\'actualité';
        this.isLoading = false;
      }
    );
  }

  navigateToList(): void {
    this.router.navigate(['/admin/news']);
  }
}