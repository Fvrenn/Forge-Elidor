import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtelierComponent } from './component/pages/atelier/atelier.component';
import { CuisineComponent } from './component/pages/produit/cuisine/cuisine.component';
import { OutdorComponent } from './component/pages/produit/outdor/outdor.component';
import { PliantComponent } from './component/pages/produit/pliant/pliant.component';
import { ExceptionComponent } from './component/pages/produit/exception/exception.component';
import { ToutLesProduitsComponent } from './component/pages/produit/tout-les-produits/tout-les-produits.component';
import { DetailProduitComponent } from './component/pages/detail-produit/detail-produit.component';
import { NavComponent } from './component/composant/nav/nav.component';
import { FooterComponent } from './component/composant/footer/footer.component';
import { HeroComponent } from './component/composant/pages/home/hero/hero.component';
import { DerniersCouteauxComponent } from './component/composant/pages/home/derniers-couteaux/derniers-couteaux.component';
import { AProposComponent } from './component/composant/pages/home/a-propos/a-propos.component';
import { BanniereComponent } from './component/composant/pages/home/banniere/banniere.component';
import { ActualiteRecenteComponent } from './component/composant/pages/home/actualite-recente/actualite-recente.component';

@NgModule({
  declarations: [
    AppComponent,
    AtelierComponent,
    CuisineComponent,
    OutdorComponent,
    PliantComponent,
    ExceptionComponent,
    ToutLesProduitsComponent,
    DetailProduitComponent,
    NavComponent,
    FooterComponent,
    HeroComponent,
    DerniersCouteauxComponent,
    AProposComponent,
    BanniereComponent,
    ActualiteRecenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
