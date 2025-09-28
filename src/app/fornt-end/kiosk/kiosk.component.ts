import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { ProductCategory } from '../../models/ProductCategory';
import { ProductCategoryService } from '../../services/ProductCategoryService';
import { ProductsServices } from '../../services/products.services';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardActions, MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/OrderService';
import { MatButtonModule } from '@angular/material/button';
import {MatChipAvatar} from "@angular/material/chips";
import {MatToolbar} from "@angular/material/toolbar";
import {BasketComponent} from "../basket/basket.component";
import {ProductInOrderDto} from "../../Dtos/product-in-order.dto";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-kiosk',
  standalone:true,
    imports: [MatIconModule, MatCard, MatCardActions, CommonModule, MatCardModule, MatButtonModule, MatChipAvatar, MatToolbar, BasketComponent, RouterLink],
  providers:[OrderService,ProductCategoryService,ProductsServices],
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent implements OnInit, OnDestroy {

showProductDialog(arg0: string) {
throw new Error('Method not implemented.');
}

subscriptions: Subscription[] = [];
categories: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>([])
allProduct: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([])
productsInBasketCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

constructor(private categoryService: ProductCategoryService, private productService: ProductsServices, private orderService: OrderService ){}


ngOnInit(): void {
  this.subscriptions.push(
    this.categoryService.getProductsCategories().subscribe(productCategories => {
    this.categories.next(productCategories);
  }))


  this.subscriptions.push(
    this.productService.getProducts().pipe().subscribe(
      products => this.allProduct.next(products)
    ));

  this.orderService.order$.subscribe((data)=>{
    this.productsInBasketCount.next(data.products.length)
  })
}

addToBasket(product: ProductModel): void {
  // Create a ProductInOrderDto from ProductModel
  const productInOrder: ProductInOrderDto = {
    product: product,
    quantity: 1 // default quantity can be set here, or you can make it dynamic
  };

  // Add the product to the order
  this.orderService.addProductToOrder(productInOrder);
  // Log the updated order by subscribing to the observable
  this.orderService.order$.subscribe(order => {
    console.log('Updated order:', order);
  });
}

getProductsByCategory(arg0: string) {
   this.productService.getProductsByCategoryRef(arg0).subscribe(products => {
     this.allProduct.next(products);
   })
  }

ngOnDestroy(): void {
  // Destroy all subscriptions
  this.subscriptions.forEach(subscription => subscription.unsubscribe() );
}
}
