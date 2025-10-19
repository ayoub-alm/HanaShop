import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasketComponent} from "../basket/basket.component";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton, MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {OrderService} from "../../services/OrderService";
import {AuthService} from "../../services/auth.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatDivider} from "@angular/material/divider";
import {MatTooltipModule} from "@angular/material/tooltip";

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
        MatToolbar,
        RouterOutlet,
        RouterLink,
        CommonModule,
        MatMenuModule,
        MatTooltipModule,
        RouterLinkActive
    ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
    productsInBasketCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    isAuthenticated$!: Observable<boolean>;
    constructor(private orderService: OrderService, public router: Router, public authService: AuthService) {
    }
    ngOnInit(): void {
        this.isAuthenticated$ = this.authService.isAuthenticated$;
        this.orderService.order$.subscribe((data)=>{
            this.productsInBasketCount.next(data.products.length)
        })
        // AOS animations removed
    }

    logout(): void {
      this.authService.logout();
    }

    protected readonly AuthService = AuthService;
}