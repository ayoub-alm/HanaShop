import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatIconModule,
    MatButton
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders = [
    { id: 1, details: 'Pizza Margherita', status: 'new' },
    { id: 2, details: 'Tacos & Fries', status: 'in-progress' },
    { id: 3, details: 'Burger Classic', status: 'done' }
  ];

  get newOrders() {
    return this.orders.filter(o => o.status === 'new');
  }

  get inProgressOrders() {
    return this.orders.filter(o => o.status === 'in-progress');
  }

  get doneOrders() {
    return this.orders.filter(o => o.status === 'done');
  }

  moveToProgress(order: any) {
    order.status = 'in-progress';
  }

  markAsDone(order: any) {
    order.status = 'done';
  }

  onRefuse() {

  }

  onAccept(){

  }

  onMarkDelivered() {

  }
  onCancel(){}
}
