import {Component, OnInit} from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderSectionComponent } from '../header-section/header-section.component';
import { CategoriesSectionComponent } from '../categories-section/categories-section.component';
import { PartneresComponent } from '../partneres/partneres.component';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../services/OrderService';
import { ProductsServices } from '../../services/products.services';
import { ProductCategoryService } from '../../services/ProductCategoryService';
import { ContactUsComponent } from "../contact-us/contact-us.component";
import { MatSidenavModule} from "@angular/material/sidenav";

import {BehaviorSubject} from "rxjs";
import AOS from "aos";
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        FooterComponent,
        HeaderSectionComponent,
        CategoriesSectionComponent,
        PartneresComponent,
        MatIconModule, MatSidenavModule,
        ContactUsComponent,
    ],
  providers:[OrderService,ProductsServices,ProductCategoryService],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
    productsInBasketCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    constructor(private orderService: OrderService, private router: Router) {
    }
    ngOnInit(): void {
        this.orderService.order$.subscribe((data)=>{
            this.productsInBasketCount.next(data.products.length)
        })

        AOS.init({
            duration: 1200, // Animation duration (optional)
            easing: 'ease', // Animation easing (optional)
            once: true, // Run animation only once (optional)
            mirror: true, // Trigger animation when scrolling back (optional)
            offset: 200, // Set the trigger offset (optional)
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                AOS.refresh();
            }
        });
    }
}
