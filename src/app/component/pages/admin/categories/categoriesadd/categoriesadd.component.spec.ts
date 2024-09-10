import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesaddComponent } from './categoriesadd.component';

describe('CategoriesaddComponent', () => {
  let component: CategoriesaddComponent;
  let fixture: ComponentFixture<CategoriesaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
