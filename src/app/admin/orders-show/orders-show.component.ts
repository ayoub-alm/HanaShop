import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {CurrencyPipe, NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-orders-show',
  standalone: true,
  imports: [
    MatCardActions,
    MatIcon,
    MatButton,
    CurrencyPipe,
    MatCardContent,
    TitleCasePipe,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    NgClass, MatCardSubtitle, NgIf, NgForOf
  ],
  templateUrl: './orders-show.component.html',
  styleUrl: './orders-show.component.css'
})
export class OrdersShowComponent {
  order = {
    id: 111,
    type: 'Delivery',
    status: 'new', // 'in-progress' | 'done'
    products: [
      { name: 'Pizza Margherita', quantity: 2, price: 60 },
      { name: 'Tacos', quantity: 1, price: 45 }
    ]
  };

  getTotal(products: any[]) {
    return products.reduce((sum, p) => sum + p.quantity * p.price, 0);
  }

  onAccept(order: any) {
    order.status = 'in-progress';
  }

  onDeliver(order: any) {
    order.status = 'done';
  }

  onCancel(order: any) {
    // handle cancel
  }

}
