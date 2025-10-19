import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {BehaviorSubject, Subscription} from "rxjs";
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {ProductCategoryService} from "../../services/ProductCategoryService";
import {ProductsServices} from "../../services/products.services";
import {OrderService} from "../../services/OrderService";
import {MatDialog} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";
import {ProductInOrderDto} from "../../Dtos/product-in-order.dto";
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from "@angular/material/slider";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * Product All Component
 * Displays all products with filtering, sorting, and pagination
 */
@Component({
  selector: 'app-product-all',
  standalone: true,
  imports: [
    FooterComponent,
    AsyncPipe,
    MatCard,
    MatIcon,
    NgForOf,
    RouterLink,
    MatSlider,
    MatHint,
    MatSliderRangeThumb,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatPaginatorModule
  ],
  templateUrl: './product-all.component.html',
  styleUrl: './product-all.component.css'
})
export class ProductAllComponent implements OnInit {
  subscriptions: Subscription[] = [];
  allProducts: ProductModel[] = [];
  selectedProducts: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  pagedProducts: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  pageIndex = 0;
  pageSize = 9;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private categoryService: ProductCategoryService,
              private productService: ProductsServices,
              private orderService: OrderService,
              private dialog: MatDialog,private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
        this.productService.getProducts().pipe().subscribe(
            products => {
              this.selectedProducts.next(products)
              this.totalItems = products.length;
              this.updatePagedProducts();
            }
        ));
  }

  /**
   * Handle page change event
   */
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  /**
   * Add product to basket
   */
  addToBasket(product: ProductModel): void {
    // Create a ProductInOrderDto from ProductModel
    const productInOrder: ProductInOrderDto = {
      product: product,
      quantity: 1 // default quantity can be set here, or you can make it dynamic
    };
    
    // Add the product to the order
    this.orderService.addProductToOrder(productInOrder);
    
    // Show success message
    this.snackBar.open(`${product.name} added to cart!`, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
    
    // Log the updated order by subscribing to the observable
    this.orderService.order$.subscribe(order => {
      console.log('Updated order:', order);
    });
  }



  private updatePagedProducts(): void {
    const all = this.selectedProducts.getValue();
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts.next(all.slice(start, end));
  }

    protected readonly Math = Math;
    totalProducts: any;
}
