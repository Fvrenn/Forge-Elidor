import { Component } from '@angular/core';
import { GalleryService } from '../../../../../services/gallery/gallery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galleryadd',
  templateUrl: './galleryadd.component.html',
  styleUrl: './galleryadd.component.scss'
})
export class GalleryaddComponent {
  selectedFile: File | null = null;
  title: string = '';
  category: string = 'cuisine';

  constructor(private galleryService: GalleryService, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      formData.append('title', this.title);
      formData.append('category', this.category);

      this.galleryService.addImage(formData).subscribe(
        (response: any) => {
          console.log('Image ajoutée avec succès', response);
          this.router.navigate(['/admin/gallery']);
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout de l\'image', error);
        }
      );
    }
  }

  navigateToList(): void {
    this.router.navigate(['/admin/gallery']);
  }
}