import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesdetailComponent } from './commandesdetail.component';

describe('CommandesdetailComponent', () => {
  let component: CommandesdetailComponent;
  let fixture: ComponentFixture<CommandesdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandesdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandesdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
