import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewseditComponent } from './newsedit.component';

describe('NewseditComponent', () => {
  let component: NewseditComponent;
  let fixture: ComponentFixture<NewseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewseditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
