import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../../../../../services/news/news.service';

@Component({
  selector: 'app-newsadd',
  templateUrl: './newsadd.component.html',
  styleUrl: './newsadd.component.scss'
})
export class NewsaddComponent {
  news = {
    title: '',
    publicationDate: '',
    content: '',
    imageUrl: ''
  };
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private newsService: NewsService
  ) {}

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
    if (!this.selectedFile) {
      this.errorMessage = 'Veuillez sélectionner une image';
      return;
    }
    
    this.isLoading = true;
    const formData = new FormData();
    formData.append('title', this.news.title);
    formData.append('publicationDate', this.news.publicationDate);
    formData.append('content', this.news.content);
    formData.append('image', this.selectedFile, this.selectedFile.name);

    this.newsService.addNews(formData).subscribe(
      (response: any) => {
        console.log('Actualité ajoutée avec succès', response);
        this.isLoading = false;
        this.router.navigate(['/admin/news']);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout de l\'actualité', error);
        this.errorMessage = 'Une erreur est survenue lors de l\'ajout de l\'actualité';
        this.isLoading = false;
      }
    );
  }

  navigateToList(): void {
    this.router.navigate(['/admin/news']);
  }
}