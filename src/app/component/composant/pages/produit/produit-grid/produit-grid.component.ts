import { Component } from '@angular/core';

@Component({
  selector: 'app-produit-grid',
  templateUrl: './produit-grid.component.html',
  styleUrl: './produit-grid.component.scss'
})
export class ProduitGridComponent {
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
