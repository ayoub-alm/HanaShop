import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersShowComponent } from './orders-show.component';

describe('OrdersShowComponent', () => {
  let component: OrdersShowComponent;
  let fixture: ComponentFixture<OrdersShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
