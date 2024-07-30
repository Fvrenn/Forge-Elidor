import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PliantComponent } from './pliant.component';

describe('PliantComponent', () => {
  let component: PliantComponent;
  let fixture: ComponentFixture<PliantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PliantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PliantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
