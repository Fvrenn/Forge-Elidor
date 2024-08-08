import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanniereProduitComponent } from './banniere-produit.component';

describe('BanniereProduitComponent', () => {
  let component: BanniereProduitComponent;
  let fixture: ComponentFixture<BanniereProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BanniereProduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BanniereProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
