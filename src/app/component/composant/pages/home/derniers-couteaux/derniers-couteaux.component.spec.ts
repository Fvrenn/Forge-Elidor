import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerniersCouteauxComponent } from './derniers-couteaux.component';

describe('DerniersCouteauxComponent', () => {
  let component: DerniersCouteauxComponent;
  let fixture: ComponentFixture<DerniersCouteauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DerniersCouteauxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DerniersCouteauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
