import { Component, OnInit } from '@angular/core';
import { KnifeService } from '../../../../../services/knife/knife.service';

@Component({
  selector: 'app-produit-grid',
  templateUrl: './produit-grid.component.html',
  styleUrl: './produit-grid.component.scss'
})
export class ProduitGridComponent implements OnInit {
  knives: any[] = [];

  constructor(private knifeService: KnifeService) {}

  ngOnInit(): void {
    this.loadKnives();
  }

  loadKnives(): void {
    this.knifeService.getKnives().subscribe(
      (data: any[]) => {
        this.knives = data;
      },
      (error: any) => {
        console.error('Failed to fetch knives', error);
      }
    );
  }

  showBasket(event: MouseEvent): void {
    const element = (event.currentTarget as HTMLElement).querySelector('.add-basket');
    if (element) {
      element.classList.add('show');
    }
  }

  hideBasket(event: MouseEvent): void {
    const element = (event.currentTarget as HTMLElement).querySelector('.add-basket');
    if (element) {
      element.classList.remove('show');
    }
  }
}