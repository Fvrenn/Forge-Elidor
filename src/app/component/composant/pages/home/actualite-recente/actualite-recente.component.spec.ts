import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiteRecenteComponent } from './actualite-recente.component';

describe('ActualiteRecenteComponent', () => {
  let component: ActualiteRecenteComponent;
  let fixture: ComponentFixture<ActualiteRecenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualiteRecenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualiteRecenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
