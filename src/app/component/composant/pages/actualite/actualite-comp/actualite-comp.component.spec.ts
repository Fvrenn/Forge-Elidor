import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiteCompComponent } from './actualite-comp.component';

describe('ActualiteCompComponent', () => {
  let component: ActualiteCompComponent;
  let fixture: ComponentFixture<ActualiteCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualiteCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualiteCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
