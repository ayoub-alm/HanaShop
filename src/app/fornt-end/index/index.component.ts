import {Component, OnInit} from '@angular/core';
import {BasketComponent} from "../basket/basket.component";
import {CategoriesSectionComponent} from "../categories-section/categories-section.component";
import {ContactUsComponent} from "../contact-us/contact-us.component";
import {HeaderSectionComponent} from "../header-section/header-section.component";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton, MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {PartneresComponent} from "../partneres/partneres.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {OrderService} from "../../services/OrderService";
import {AuthService} from "../../services/auth.service";
import {CommonModule} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";
import {MatDivider} from "@angular/material/divider";
import {MatTooltipModule} from "@angular/material/tooltip";
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
        MatButton,
        MatToolbar,
        RouterOutlet,
        RouterLink,
        CommonModule,
        MatMenuModule,
        MatDivider,
        MatTooltipModule
    ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
    productsInBasketCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    isAuthenticated = false;
    currentUser: any = null;

    constructor(
      private orderService: OrderService,
      public router: Router,
      public authService: AuthService
    ) {}

    ngOnInit(): void {
        this.orderService.order$.subscribe((data)=>{
            this.productsInBasketCount.next(data.products.length)
        })

        // Subscribe to authentication status
        this.authService.isAuthenticated$.subscribe(isAuth => {
          this.isAuthenticated = isAuth;
        });

        // Subscribe to current user
        this.authService.currentUser.subscribe(user => {
          this.currentUser = user;
        });

        AOS.init({
            // duration: 1400, // Animation duration (optional)
            easing: 'fade', // Animation easing (optional)
            // once: true, // Run animation only once (optional)
            mirror: true, // Trigger animation when scrolling back (optional)
            offset: -100, // Set the trigger offset (optional)
        });
    }

    logout(): void {
      this.authService.logout();
    }
}