import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Ajoutez cette ligne

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
import { AdminLayoutComponent } from './component/pages/admin/admin-layout/admin-layout.component';
import { LoginComponent } from './component/pages/login/login.component';
import { DashboardComponent } from './component/pages/admin/dashboard/dashboard.component';
import { CouteauxlistComponent } from './component/pages/admin/couteaux/couteauxlist/couteauxlist.component';
import { CouteauxaddComponent } from './component/pages/admin/couteaux/couteauxadd/couteauxadd.component';
import { CouteauxeditComponent } from './component/pages/admin/couteaux/couteauxedit/couteauxedit.component';
import { CategorieslistComponent } from './component/pages/admin/categories/categorieslist/categorieslist.component';
import { CategoriesaddComponent } from './component/pages/admin/categories/categoriesadd/categoriesadd.component';
import { CategorieseditComponent } from './component/pages/admin/categories/categoriesedit/categoriesedit.component';
import { NewslistComponent } from './component/pages/admin/news/newslist/newslist.component';
import { NewsaddComponent } from './component/pages/admin/news/newsadd/newsadd.component';
import { NewseditComponent } from './component/pages/admin/news/newsedit/newsedit.component';
import { UtilisateurslistComponent } from './component/pages/admin/utilisateurs/utilisateurslist/utilisateurslist.component';
import { UtilisateurseeditComponent } from './component/pages/admin/utilisateurs/utilisateurseedit/utilisateurseedit.component';
import { CommandeslistComponent } from './component/pages/admin/commandes/commandeslist/commandeslist.component';
import { CommandesdetailComponent } from './component/pages/admin/commandes/commandesdetail/commandesdetail.component';
import { RegisterComponent } from './component/pages/register/register.component';

import { AuthService } from './services/authService/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
    ActualiteCompComponent,
    AdminLayoutComponent,
    LoginComponent,
    DashboardComponent,
    CouteauxlistComponent,
    CouteauxaddComponent,
    CouteauxeditComponent,
    CategorieslistComponent,
    CategoriesaddComponent,
    CategorieseditComponent,
    NewslistComponent,
    NewsaddComponent,
    NewseditComponent,
    UtilisateurslistComponent,
    UtilisateurseeditComponent,
    CommandeslistComponent,
    CommandesdetailComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
