import { Component, OnInit } from '@angular/core';
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

  getFullImagePath(image: string): string {
    return `http://localhost:5000/${image}`;
  }

  changerImagePrincipale(nouvelleImage: string): void {
    this.imagePrincipale = nouvelleImage;
  }
}