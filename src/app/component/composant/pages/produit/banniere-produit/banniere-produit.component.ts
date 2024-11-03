import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banniere-produit',
  templateUrl: './banniere-produit.component.html',
  styleUrl: './banniere-produit.component.scss'
})
export class BanniereProduitComponent implements OnInit, OnDestroy {
  currentCategory: string = '';
  bannerImage: string = '';
  pageType: string = 'Produits'; // Nouvelle propriété pour gérer le type de page
  private routerSubscription!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateContent();
    });

    this.updateContent();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateContent(): void {
    const url = this.router.url;
    // Détermine si nous sommes sur la page galerie ou produits
    this.pageType = url.includes('/galerie') ? 'Galerie' : 'Produits';
    
    const category = url.split('/').pop();
    switch(category) {
      case 'cuisine':
        this.currentCategory = 'Couteaux de Cuisine';
        this.bannerImage = '../../../../../../assets/images/produit/banniere-produit/banniere-cuisine.jpg';
        break;
      case 'outdoor':
        this.currentCategory = 'Couteaux Outdoor';
        this.bannerImage = '../../../../../../assets/images/produit/banniere-produit/banniere-outdoor.jpg';
        break;
      case 'pliant':
        this.currentCategory = 'Couteaux Pliant';
        this.bannerImage = '../../../../../../assets/images/produit/banniere-produit/banniere-pliant.jpg';
        break;
      case 'exception':
        this.currentCategory = 'Couteaux d\'Exception';
        this.bannerImage = '../../../../../../assets/images/produit/banniere-produit/banniere-exception.jpg';
        break;
      default:
        this.currentCategory = 'Tous les couteaux';
        this.bannerImage = '../../../../../../assets/images/produit/banniere-produit/banniere-tout.jpg';
        break;
    }
  }
}