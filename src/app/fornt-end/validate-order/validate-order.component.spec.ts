import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOrderComponent } from './validate-order.component';

describe('ValidateOrderComponent', () => {
  let component: ValidateOrderComponent;
  let fixture: ComponentFixture<ValidateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
