import {Component, OnInit} from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {FooterComponent} from "../footer/footer.component";
import {CategoriesSectionComponent} from "../categories-section/categories-section.component";
import {ContactUsComponent} from "../contact-us/contact-us.component";
import {HeaderSectionComponent} from "../header-section/header-section.component";
import {PartneresComponent} from "../partneres/partneres.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {BehaviorSubject, Subscription} from "rxjs";
import {ProductModel} from "../../models/product.model";
import {ProductCategoryService} from "../../services/ProductCategoryService";
import {ProductsServices} from "../../services/products.services";
import {OrderService} from "../../services/OrderService";
import {MatDialog} from "@angular/material/dialog";
import {ProductCategory} from "../../models/ProductCategory";
import {RouterLink} from "@angular/router";
import {ProductInOrderDto} from "../../Dtos/product-in-order.dto";
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from "@angular/material/slider";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
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
    MatIconButton,
    NgForOf,
    RouterLink,
    MatSlider,
    MatHint,
    MatSliderRangeThumb,
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatPaginator
  ],
  templateUrl: './product-all.component.html',
  styleUrl: './product-all.component.css'
})
export class ProductAllComponent implements OnInit {
  subscriptions: Subscription[] = [];
  allProducts: ProductModel[] = [];
  selectedProducts: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  
  // Pagination properties
  pageSize = 12;
  pageIndex = 0;
  totalProducts = 0;
  pageSizeOptions = [6, 12, 24, 48];

  // Expose Math to template
  Math = Math;

  constructor(
    private categoryService: ProductCategoryService,
    private productService: ProductsServices,
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.productService.getProducts().pipe().subscribe(
        products => {
          this.allProducts = products;
          this.totalProducts = products.length;
          this.updateDisplayedProducts();
        }
      )
    );
  }

  /**
   * Update displayed products based on pagination
   */
  updateDisplayedProducts(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedProducts = this.allProducts.slice(startIndex, endIndex);
    this.selectedProducts.next(paginatedProducts);
    
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Handle page change event
   */
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedProducts();
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
