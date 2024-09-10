import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouteauxlistComponent } from './couteauxlist.component';

describe('CouteauxlistComponent', () => {
  let component: CouteauxlistComponent;
  let fixture: ComponentFixture<CouteauxlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouteauxlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouteauxlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
