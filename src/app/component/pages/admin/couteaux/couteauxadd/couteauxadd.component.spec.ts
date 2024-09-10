import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouteauxaddComponent } from './couteauxadd.component';

describe('CouteauxaddComponent', () => {
  let component: CouteauxaddComponent;
  let fixture: ComponentFixture<CouteauxaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouteauxaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouteauxaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
