import {Component, OnInit} from '@angular/core';
import {BasketComponent} from "../basket/basket.component";
import {CategoriesSectionComponent} from "../categories-section/categories-section.component";
import {ContactUsComponent} from "../contact-us/contact-us.component";
import {HeaderSectionComponent} from "../header-section/header-section.component";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {PartneresComponent} from "../partneres/partneres.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {OrderService} from "../../services/OrderService";
import AOS from "aos";

@Component({
  selector: 'app-index',
  standalone: true,
    imports: [
        BasketComponent,
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        MatIcon,
        MatIconButton,
        MatToolbar,
        RouterOutlet,
        RouterLink
    ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
    productsInBasketCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    constructor(private orderService: OrderService, public router: Router) {
    }
    ngOnInit(): void {
        this.orderService.order$.subscribe((data)=>{
            this.productsInBasketCount.next(data.products.length)
        })

        AOS.init({
            // duration: 1400, // Animation duration (optional)
            easing: 'fade', // Animation easing (optional)
            // once: true, // Run animation only once (optional)
            mirror: true, // Trigger animation when scrolling back (optional)
            offset: -100, // Set the trigger offset (optional)
        });
    }
}