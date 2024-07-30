import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToutLesProduitsComponent } from './tout-les-produits.component';

describe('ToutLesProduitsComponent', () => {
  let component: ToutLesProduitsComponent;
  let fixture: ComponentFixture<ToutLesProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToutLesProduitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToutLesProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
