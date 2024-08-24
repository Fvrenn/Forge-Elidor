import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtelierComponent } from './component/pages/atelier/atelier.component';
import { DetailProduitComponent } from './component/pages/detail-produit/detail-produit.component';
import { NavComponent } from './component/composant/nav/nav.component';
import { FooterComponent } from './component/composant/footer/footer.component';
import { HeroComponent } from './component/composant/pages/home/hero/hero.component';
import { DerniersCouteauxComponent } from './component/composant/pages/home/derniers-couteaux/derniers-couteaux.component';
import { AProposComponent } from './component/composant/pages/home/a-propos/a-propos.component';
import { BanniereComponent } from './component/composant/pages/home/banniere/banniere.component';
import { ActualiteRecenteComponent } from './component/composant/pages/home/actualite-recente/actualite-recente.component';
import { HomeComponent } from './component/pages/home/home.component';
import { ProduitComponent } from './component/pages/produit/produit.component';
import { ProduitGridComponent } from './component/composant/pages/produit/produit-grid/produit-grid.component';
import { BanniereProduitComponent } from './component/composant/pages/produit/banniere-produit/banniere-produit.component';
import { GalerieComponent } from './component/pages/galerie/galerie.component';
import { ActualiteComponent } from './component/pages/actualite/actualite.component';
import { ActualiteCompComponent } from './component/composant/pages/actualite/actualite-comp/actualite-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    AtelierComponent,
    DetailProduitComponent,
    NavComponent,
    FooterComponent,
    HeroComponent,
    DerniersCouteauxComponent,
    AProposComponent,
    BanniereComponent,
    ActualiteRecenteComponent,
    HomeComponent,
    ProduitComponent,
    ProduitGridComponent,
    BanniereProduitComponent,
    GalerieComponent,
    ActualiteComponent,
    ActualiteCompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
