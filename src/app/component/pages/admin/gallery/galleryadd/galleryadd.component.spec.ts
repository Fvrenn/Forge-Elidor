import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryaddComponent } from './galleryadd.component';

describe('GalleryaddComponent', () => {
  let component: GalleryaddComponent;
  let fixture: ComponentFixture<GalleryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalleryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
