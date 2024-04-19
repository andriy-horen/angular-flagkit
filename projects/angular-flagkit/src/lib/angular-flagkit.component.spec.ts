import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFlagkitComponent } from './angular-flagkit.component';

describe('AngularFlagkitComponent', () => {
  let component: AngularFlagkitComponent;
  let fixture: ComponentFixture<AngularFlagkitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFlagkitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularFlagkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
