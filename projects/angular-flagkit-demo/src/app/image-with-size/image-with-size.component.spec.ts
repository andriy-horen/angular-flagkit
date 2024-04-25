import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWithSizeComponent } from './image-with-size.component';

describe('ImageWithSizeComponent', () => {
  let component: ImageWithSizeComponent;
  let fixture: ComponentFixture<ImageWithSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageWithSizeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageWithSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
