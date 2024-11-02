import { Component, OnInit } from '@angular/core';
import { KnifeService } from '../../../../../services/knife/knife.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produit-grid',
  templateUrl: './produit-grid.component.html',
  styleUrl: './produit-grid.component.scss'
})
export class ProduitGridComponent implements OnInit {
  knives: any[] = [];
  filteredKnives: any[] = [];
  selectedCategory: string = '';

  constructor(private knifeService: KnifeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadKnives();
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.filterKnives(this.selectedCategory);
      } else {
        this.filterKnives('');
      }
    });
  }

  loadKnives(): void {
    this.knifeService.getKnives().subscribe(
      (data: any[]) => {
        this.knives = data;
        this.filterKnives(this.selectedCategory);
      },
      (error: any) => {
        console.error('Failed to fetch knives', error);
      }
    );
  }

  filterKnives(category: string): void {
    if (category) {
      this.filteredKnives = this.knives.filter(knife => knife.categorie.toLowerCase() === category.toLowerCase());
    } else {
      this.filteredKnives = this.knives;
    }
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