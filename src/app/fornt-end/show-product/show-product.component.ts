import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ProductsServices } from '../../services/products.services';
import { ProductModel } from '../../models/product.model';
import { BehaviorSubject } from 'rxjs';
import {MatIcon} from "@angular/material/icon";
import {ProductInOrderDto} from "../../Dtos/product-in-order.dto";
import {OrderService} from "../../services/OrderService";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-show-product',
  standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatButtonModule,
        MatIcon,
        RouterLink,
        FooterComponent
    ],
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  panelOpenState = true;
  orderFormGroup!: FormGroup;
  product$ = new BehaviorSubject<ProductModel | null>(null);
  products = new BehaviorSubject<ProductModel[] | null>([]);

  constructor(
      private fb: FormBuilder,
      private productService: ProductsServices,
      private route: ActivatedRoute,private orderService:OrderService,
  ) {}

  ngOnInit(): void {
    this.orderFormGroup = this.fb.group({
      quantity: [1, Validators.required]
    })

    this.route.params.subscribe(params => {
      const ref = params['ref'];
      this.loadProduct(ref); // call a method to fetch new data based on ref
    });
  }

  loadProduct(ref:string) {
    if (ref) {
      this.productService.getProductByRef(ref).subscribe(product => {
        this.product$.next(product);
        this.productService.getProductsByCategoryId(product.categoryId).subscribe(products => {
          this.products.next(products);
        })
      });
    }
  }




  increaseQuantity(): void {
    const current = this.orderFormGroup.get('quantity')?.value || 1;
    this.orderFormGroup.get('quantity')?.setValue(current + 1);
  }

  decreaseQuantity(): void {
    const current = this.orderFormGroup.get('quantity')?.value || 1;
    if (current > 1) {
      this.orderFormGroup.get('quantity')?.setValue(current - 1);
    }
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

}
