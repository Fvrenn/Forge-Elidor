import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrl: './detail-produit.component.scss'
})

export class DetailProduitComponent {
  imagePrincipale: string = '../../../../assets/images/couteau/couteau_1.jpg';
  
  images: string[] = [
    '../../../../assets/images/couteau/couteau_1.jpg',
    '../../../../assets/images/couteau/couteau_9.jpg',
    '../../../../assets/images/couteau/couteau_4.jpg'
  ];

  changerImagePrincipale(nouvelleImage: string) {
    this.imagePrincipale = nouvelleImage;
  }
}