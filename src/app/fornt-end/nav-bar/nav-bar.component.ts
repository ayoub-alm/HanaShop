import {Component, OnInit} from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {OrderService} from "../../services/OrderService";
import {BehaviorSubject} from "rxjs";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-nav-bar',
  standalone:true,
  imports: [MatIconModule, MatButtonModule, CommonModule, MatToolbar],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  productsInBasketCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private orderService: OrderService) {
  }


  ngOnInit(): void {
    this.orderService.order$.subscribe((data)=>{
      this.productsInBasketCount.next(data.products.length)
    })
  }
}
