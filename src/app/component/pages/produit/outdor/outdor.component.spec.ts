import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdorComponent } from './outdor.component';

describe('OutdorComponent', () => {
  let component: OutdorComponent;
  let fixture: ComponentFixture<OutdorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutdorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutdorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
