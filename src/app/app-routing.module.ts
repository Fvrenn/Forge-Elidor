import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/pages/home/home.component';
import { ProduitComponent } from './component/pages/produit/produit.component';
import { AtelierComponent } from './component/pages/atelier/atelier.component';
import { DetailProduitComponent } from './component/pages/detail-produit/detail-produit.component';
import { GalerieComponent } from './component/pages/galerie/galerie.component';
import { ActualiteCompComponent } from './component/composant/pages/actualite/actualite-comp/actualite-comp.component';

const routes: Routes = [
  {path: "", component: HomeComponent },
  {path: "produit", component: ProduitComponent},
  {path: "atelier", component: AtelierComponent},
  {path: "detail-produit", component: DetailProduitComponent},
  {path: "galerie", component : GalerieComponent},
  {path: "actualite", component: ActualiteCompComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
