import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/pages/home/home.component';
import { ProduitComponent } from './component/pages/produit/produit.component';
import { AtelierComponent } from './component/pages/atelier/atelier.component';
import { DetailProduitComponent } from './component/pages/detail-produit/detail-produit.component';
import { GalerieComponent } from './component/pages/galerie/galerie.component';
import { ActualiteComponent } from './component/pages/actualite/actualite.component';
import { LoginComponent } from './component/pages/login/login.component';
import { AdminLayoutComponent } from './component/pages/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './component/pages/admin/dashboard/dashboard.component';
import { CouteauxlistComponent } from './component/pages/admin/couteaux/couteauxlist/couteauxlist.component';
import { CouteauxaddComponent } from './component/pages/admin/couteaux/couteauxadd/couteauxadd.component';
import { CouteauxeditComponent } from './component/pages/admin/couteaux/couteauxedit/couteauxedit.component';
import { CategorieslistComponent } from './component/pages/admin/categories/categorieslist/categorieslist.component';
import { CategoriesaddComponent } from './component/pages/admin/categories/categoriesadd/categoriesadd.component';
import { NewslistComponent } from './component/pages/admin/news/newslist/newslist.component';
import { UtilisateurslistComponent } from './component/pages/admin/utilisateurs/utilisateurslist/utilisateurslist.component';
import { CommandeslistComponent } from './component/pages/admin/commandes/commandeslist/commandeslist.component';
import { RegisterComponent } from './component/pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ProduitGridComponent } from './component/composant/pages/produit/produit-grid/produit-grid.component';
import { GallerylistComponent } from './component/pages/admin/gallery/gallerylist/gallerylist.component';
import { GalleryaddComponent } from './component/pages/admin/gallery/galleryadd/galleryadd.component';
import { NewsaddComponent } from './component/pages/admin/news/newsadd/newsadd.component';
import { NewseditComponent } from './component/pages/admin/news/newsedit/newsedit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'produit',
    component: ProduitComponent,
    children: [
      { path: '', component: ProduitGridComponent },
      { path: ':category', component: ProduitGridComponent },
    ],
  },
  { path: 'atelier', component: AtelierComponent },
  { path: 'detail-produit/:id', component: DetailProduitComponent },
  { path: 'galerie', component: GalerieComponent },
  { path: 'galerie/:category', component: GalerieComponent },
  { path: 'actualite', component: ActualiteComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },

  // Routes admin
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'couteaux', component: CouteauxlistComponent },
      { path: 'couteaux/add', component: CouteauxaddComponent },
      { path: 'couteaux/edit/:id', component: CouteauxeditComponent },
      { path: 'categories', component: CategorieslistComponent },
      { path: 'categories/add', component: CategoriesaddComponent },
      { path: 'news', component: NewslistComponent },
      { path: 'news/add', component: NewsaddComponent },
      { path: 'news/edit/:id', component: NewseditComponent },
      { path: 'utilisateurs', component: UtilisateurslistComponent },
      { path: 'commandes', component: CommandeslistComponent },
      { path: 'gallery', component: GallerylistComponent },
      { path: 'gallery/add', component: GalleryaddComponent },
    ],
  },

  // Redirection par défaut si aucune route n'est trouvée
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
