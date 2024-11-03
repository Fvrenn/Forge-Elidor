import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../../../../services/gallery/gallery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallerylist',
  templateUrl: './gallerylist.component.html',
  styleUrl: './gallerylist.component.scss'
})
export class GallerylistComponent implements OnInit {
  images: any[] = [];

  constructor(private galleryService: GalleryService, private router: Router) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.galleryService.getImages().subscribe(
      (data: any[]) => {
        this.images = data;
      },
      (error: any) => {
        console.error('Failed to fetch images', error);
      }
    );
  }

  deleteImage(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      this.galleryService.deleteImage(id).subscribe(
        () => {
          this.images = this.images.filter(image => image.id !== id);
          console.log('Image supprimée avec succès');
        },
        (error: any) => {
          console.error('Erreur lors de la suppression de l\'image', error);
        }
      );
    }
  }

  navigateToAddImage(): void {
    this.router.navigate(['/admin/gallery/add']);
  }
}