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
  private routerSubscription!: Subscription;

  constructor(
    private knifeService: KnifeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Charger les couteaux initialement
    this.loadKnives();

    // S'abonner aux changements de route
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      const category = currentUrl.split('/').pop(); // Récupère le dernier segment de l'URL
      console.log('Current URL:', currentUrl);
      console.log('Category from URL:', category);
      this.filterKnives(category || '');
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
        const currentUrl = this.router.url;
        const category = currentUrl.split('/').pop();
        this.filterKnives(category || '');
      },
      (error: any) => {
        console.error('Failed to fetch knives', error);
      }
    );
  }

  filterKnives(category: string): void {
    console.log('Filtering by category:', category);
    console.log('All knives before filter:', this.knives);

    if (category && category !== '') {
      this.filteredKnives = this.knives.filter(knife => {
        const normalizedKnifeCategory = knife.categorie.toLowerCase();
        const normalizedUrlCategory = category.toLowerCase();
        console.log('Comparing categories:', {
          knife: normalizedKnifeCategory,
          url: normalizedUrlCategory,
          matches: normalizedKnifeCategory === normalizedUrlCategory
        });
        return normalizedKnifeCategory === normalizedUrlCategory;
      });
    } else {
      this.filteredKnives = this.knives;
    }

    console.log('Filtered knives:', this.filteredKnives);
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

  navigateToDetail(id: number): void {
    this.router.navigate(['/detail-produit', id]);
  }
}