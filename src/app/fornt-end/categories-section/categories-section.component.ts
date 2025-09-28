import {AfterViewInit, Component, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ProductCategory} from "../../models/ProductCategory";
import {ProductCategoryService} from "../../services/ProductCategoryService";
import {BehaviorSubject, Subscription, tap} from "rxjs";
import {ProductModel} from "../../models/product.model";
import {ProductsServices} from "../../services/products.services";
import {OrderService} from "../../services/OrderService";
import {MatDialog} from "@angular/material/dialog";
import {ProductDialogComponent} from "../product-dialog/product-dialog.component";
import { ProductInOrderDto } from '../../Dtos/product-in-order.dto';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatButton, MatButtonModule } from '@angular/material/button';

import { BasketComponent } from '../basket/basket.component';
import {MatChipAvatar} from "@angular/material/chips";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-categories-section',
  standalone:true,
    imports: [MatIconModule, MatCardModule, CommonModule, NavBarComponent, MatCard, MatButtonModule, BasketComponent, MatChipAvatar, RouterLink],
  providers:[OrderService],
  templateUrl: './categories-section.component.html',
  styleUrls: ['./categories-section.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriesSectionComponent implements OnInit , OnDestroy{
    subscriptions: Subscription[] = [];
    productCategories: BehaviorSubject<ProductCategory[]>;
    selectedProducts: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
    allProducts: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

    constructor(private categoryService: ProductCategoryService,
                private productService: ProductsServices,
                private orderService: OrderService,
                private dialog: MatDialog,
                ) {
      this.productCategories = new BehaviorSubject<ProductCategory[]>([]);
    }


   

  ngOnInit(): void {
      this.subscriptions.push(
        this.categoryService.getProductsCategories().subscribe(productCategories => {
        this.productCategories.next(productCategories);
      }))

      this.subscriptions.push(
      this.productService.getProducts().pipe().subscribe(
        products => {
          this.selectedProducts.next(products)
          this.allProducts.next(products)
        }
      ));
  }



    
  

  ngOnDestroy(): void {
      // Destroy all subscriptions
      // this.subscriptions.forEach(subscription => subscription.unsubscribe() );
  }

  getProductsByCategory(ref :string): void {
    this.productService.getProductsByCategoryRef(ref).subscribe(products => {
      this.selectedProducts.next(products)
    });
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
  

  showProductDialog(product_ref: string): void {
    // Fetch product data from the service
    this.productService.getProductByRef(product_ref).subscribe((selectedProduct: ProductModel) => {
      const dialogRef = this.dialog.open(ProductDialogComponent, {
        width: '60%',
        data: selectedProduct // Pass selected product as data to the dialog
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }

    getAllProducts(): void {
       this.selectedProducts.next(this.allProducts.getValue())
    }
}
