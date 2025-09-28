export class OrderModel {
  id: number;
  orderType: OrderType;
  orderState: OrderState;
  userId: number;
  orderDate: Date;
  totalAmount: number;

  constructor(id: number, orderType: OrderType, orderState: OrderState, userId: number, orderDate: Date, totalAmount: number) {
    this.id = id;
    this.orderType = orderType;
    this.orderState = orderState;
    this.userId = userId;
    this.orderDate = orderDate;
    this.totalAmount = totalAmount;
  }
}

export enum OrderType {
  ONLINE = 'Online',
  IN_STORE = 'In Store',
  PHONE = 'Phone'
}

export enum OrderState {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}
