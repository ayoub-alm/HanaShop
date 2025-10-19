import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {BehaviorSubject, Observable} from "rxjs";
import {OrderService} from "../../services/OrderService";

@Component({
  selector: 'app-index',
  standalone: true,
    imports: [
        CommonModule,
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
    isAuthenticated$!: Observable<boolean>;
    constructor(private orderService: OrderService, public router: Router, public auth: AuthService) {
    }
    ngOnInit(): void {
        this.isAuthenticated$ = this.auth.isAuthenticated$;
        this.orderService.order$.subscribe((data)=>{
            this.productsInBasketCount.next(data.products.length)
        })
        // AOS animations removed
    }

    logout(): void {
      this.authService.logout();
    }
}