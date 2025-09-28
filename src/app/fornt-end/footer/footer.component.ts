import { AfterViewInit, Component , CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {ProductsServices} from "../../services/products.services";

import  { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BasketComponent } from '../basket/basket.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone:true,
  imports:[CommonModule,MatIconModule,MatCardModule,MatCard, MatButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent implements OnInit, AfterViewInit{
  allProducts: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  selectedProducts: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  constructor( private productService: ProductsServices,) {}

  product: any;
  ngOnInit(): void {
    this.productService.getProducts().pipe().subscribe(
      products => {
        this.selectedProducts.next(products)
        this.allProducts.next(products)
      }
    );

    
  }


  ngAfterViewInit(): void {
      register();
  
    new Swiper('.swiper', {
  
      speed: 10,
      loop: true,
      cssMode: true,
      slidesPerView: 6,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        390: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 5,
        },
      },
      autoplay: {
        delay: 3000, // Time between transitions (in milliseconds)
        disableOnInteraction: false, // Keep autoplay running even after user interaction
      },
    });
  }


}
