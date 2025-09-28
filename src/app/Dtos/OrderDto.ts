import {OrderType} from "../enums/OrderType ";
import {OrderState} from "../enums/OrderState";
import {ProductModel} from "../models/product.model";
import { ProductInOrderDto } from "./product-in-order.dto";
export class OrderDto {
  constructor(
    public orderId: number,
    public orderType: OrderType,
    public orderState: OrderState,
    public userId: number,
    public orderDate: Date,
    public products: ProductInOrderDto[],
    public totalAmount: number
  ) {}

  getOrderId(): number {
    return this.orderId;
  }

 get getProducts(): ProductInOrderDto[]{
    return this.products;
 }
}
