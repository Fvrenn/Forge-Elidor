import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurslistComponent } from './utilisateurslist.component';

describe('UtilisateurslistComponent', () => {
  let component: UtilisateurslistComponent;
  let fixture: ComponentFixture<UtilisateurslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtilisateurslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilisateurslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
