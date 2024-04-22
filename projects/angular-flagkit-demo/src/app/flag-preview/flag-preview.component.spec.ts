import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagPreviewComponent } from './flag-preview.component';

describe('FlagPreviewComponent', () => {
  let component: FlagPreviewComponent;
  let fixture: ComponentFixture<FlagPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlagPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
