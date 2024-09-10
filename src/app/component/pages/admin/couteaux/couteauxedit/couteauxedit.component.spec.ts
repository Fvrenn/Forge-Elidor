import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouteauxeditComponent } from './couteauxedit.component';

describe('CouteauxeditComponent', () => {
  let component: CouteauxeditComponent;
  let fixture: ComponentFixture<CouteauxeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouteauxeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouteauxeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
