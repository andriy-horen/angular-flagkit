import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFlagsComponent } from './all-flags.component';

describe('AllFlagsComponent', () => {
  let component: AllFlagsComponent;
  let fixture: ComponentFixture<AllFlagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllFlagsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
