import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurseeditComponent } from './utilisateurseedit.component';

describe('UtilisateurseeditComponent', () => {
  let component: UtilisateurseeditComponent;
  let fixture: ComponentFixture<UtilisateurseeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtilisateurseeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilisateurseeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
