import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KnifeService } from '../../../services/knife/knife.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.scss']
})
export class DetailProduitComponent implements OnInit {
  couteau: any = {};
  imagePrincipale: string = '';
  images: string[] = [];
  @ViewChild('zoomImg') zoomImg!: ElementRef;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  isZoomed = false;
  constructor(private knifeService: KnifeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.knifeService.getKnifeById(+id).subscribe(
        (data: any) => {
          this.couteau = data;
          this.imagePrincipale = this.getFullImagePath(data.images[0]);
          this.images = data.images.map((image: string) => this.getFullImagePath(image));
        },
        (error: any) => {
          console.error('Failed to fetch knife', error);
        }
      );
    }
  }

  
  zoomImage(e: MouseEvent) {
    if (!this.isZoomed) return;

    const image = this.zoomImg.nativeElement;
    const container = this.imageContainer.nativeElement;
    const rect = container.getBoundingClientRect();

    // Calcule la position relative du curseur dans le conteneur
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Déplace l'image en fonction de la position du curseur
    image.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  }

  enableZoom() {
    this.isZoomed = true;
    this.zoomImg.nativeElement.classList.add('zoomed');
  }

  resetZoom() {
    this.isZoomed = false;
    this.zoomImg.nativeElement.classList.remove('zoomed');
  }

  getFullImagePath(image: string): string {
    return `http://localhost:5000/${image}`;
  }

  changerImagePrincipale(nouvelleImage: string): void {
    this.imagePrincipale = nouvelleImage;
  }
}