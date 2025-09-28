// order.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderDto } from '../Dtos/OrderDto';
import { ProductInOrderDto } from '../Dtos/product-in-order.dto';
import { OrderState } from '../enums/OrderState';
// import { OrderType } from '../enums/OrderType';
import { LocalStorageService } from './local-storage.service';
import { OrderType } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orderSubject: BehaviorSubject<OrderDto>;
  public order$: Observable<OrderDto>;

  constructor(private localStorageService: LocalStorageService) {
    const storedOrder = this.loadOrderFromLocalStorage();
    this.orderSubject = new BehaviorSubject<OrderDto>(storedOrder);
    this.order$ = this.orderSubject.asObservable();
  }

  // Method to update the order
  updateOrder(order: OrderDto): void {
    this.orderSubject.next(order);
    this.saveOrderToLocalStorage(order);
  }

  // Method to add a product to the order
  addProductToOrder(product: ProductInOrderDto): void {
    const currentOrder = this.orderSubject.getValue();
    const prd = currentOrder.products.find(prds => product.product.name === prds.product.name)
    if(prd){
      prd.quantity ++
    }  else{
      currentOrder.products.push(product);
    }
    currentOrder.totalAmount = this.calculateTotalAmount(currentOrder.products);
    this.updateOrder(currentOrder); // Update the order after adding the product
  }

  // Method to calculate the total amount of the order
  private calculateTotalAmount(products: ProductInOrderDto[]): number {
    return products.reduce((acc, product) => {
      const price = parseFloat(product.product.price?.toString() || '0');
      return acc + (price * product.quantity);
    }, 0);
  }

  private loadOrderFromLocalStorage(): OrderDto {
    const storedOrder = this.localStorageService.getItem('order');
    if (storedOrder) {
      return JSON.parse(storedOrder);
    } else {
      return new OrderDto(0, OrderType.ONLINE, OrderState.PENDING, 1, new Date(), [], 0);
    }
  }

  private saveOrderToLocalStorage(order: OrderDto): void {
    this.localStorageService.setItem('order', JSON.stringify(order));
  }

  resetOrder(): void {
    const reset = new OrderDto(0, OrderType.ONLINE, OrderState.PENDING, 1, new Date(), [], 0);
    this.updateOrder(reset);
  }
}
