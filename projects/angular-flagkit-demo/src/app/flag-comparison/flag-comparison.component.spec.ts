import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagComparisonComponent } from './flag-comparison.component';

describe('FlagComparisonComponent', () => {
  let component: FlagComparisonComponent;
  let fixture: ComponentFixture<FlagComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagComparisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlagComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
