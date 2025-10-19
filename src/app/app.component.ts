import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { OrderService } from './services/OrderService';
import { LocalStorageService } from './services/local-storage.service';
import { BasketComponent } from './fornt-end/basket/basket.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatButtonModule} from "@angular/material/button";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, BasketComponent, MatToolbar, MatIcon, MatButton, MatButtonModule],
  providers:[OrderService,LocalStorageService,HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Hana Shop';
  constructor(private router: Router) {}
  ngOnInit() {
    // AOS animations removed
  }
}
