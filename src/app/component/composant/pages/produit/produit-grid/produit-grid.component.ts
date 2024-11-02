import { Component, OnInit, OnDestroy } from '@angular/core';
import { KnifeService } from '../../../../../services/knife/knife.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-produit-grid',
  templateUrl: './produit-grid.component.html',
  styleUrl: './produit-grid.component.scss'
})
export class ProduitGridComponent implements OnInit, OnDestroy {
  knives: any[] = [];
  filteredKnives: any[] = [];
  selectedCategory: string = '';
  private routerSubscription!: Subscription; // Utiliser l'opérateur !

  constructor(private knifeService: KnifeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadKnives();
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.applyFilterFromUrl();
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadKnives(): void {
    this.knifeService.getKnives().subscribe(
      (data: any[]) => {
        this.knives = data;
        this.applyFilterFromUrl();
      },
      (error: any) => {
        console.error('Failed to fetch knives', error);
      }
    );
  }

  applyFilterFromUrl(): void {
    const url = this.router.url;
    const category = url.split('/').pop();
    if (category && category !== 'produit') {
      this.filterKnives(category);
    } else {
      this.filterKnives('');
    }
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