import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../../services/gallery/gallery.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent implements OnInit {
  images: any[] = [];
  category: string | null = null;
  selectedImage: any = null; // Nouvelle propriété pour la lightbox

  constructor(
    private galleryService: GalleryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      this.loadImages();
    });
  }

  loadImages(): void {
    if (this.category) {
      // Charger les images de la catégorie sélectionnée
      this.galleryService.getImagesByCategory(this.category).subscribe(
        (data: any[]) => {
          this.images = data;
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des images', error);
        }
      );
    } else {
      // Charger toutes les images
      this.galleryService.getImages().subscribe(
        (data: any[]) => {
          this.images = data;
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des images', error);
        }
      );
    }
  }

  openLightbox(image: any): void {
    this.selectedImage = image;
  }

  closeLightbox(): void {
    this.selectedImage = null;
  }
}