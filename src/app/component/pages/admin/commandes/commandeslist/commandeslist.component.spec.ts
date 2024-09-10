import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeslistComponent } from './commandeslist.component';

describe('CommandeslistComponent', () => {
  let component: CommandeslistComponent;
  let fixture: ComponentFixture<CommandeslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandeslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
