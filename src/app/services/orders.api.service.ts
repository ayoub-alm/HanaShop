import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type PaymentMethod = 'COD' | 'WHATSAPP';

export interface OrderItemRequest {
  productRef: string;
  quantity: number;
}

export interface CreateOrderRequest {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  items: OrderItemRequest[];
  totalAmount: number;
}

export interface CreateOrderResponse {
  id: number;
  status: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class OrdersApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse> {
    return this.http.post<CreateOrderResponse>(`${this.baseUrl}/orders`, request);
  }
}
