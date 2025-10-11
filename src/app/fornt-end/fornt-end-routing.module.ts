import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesSectionComponent } from './categories-section/categories-section.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { HomePageComponent } from './home-page/home-page.component';
import { KioskComponent } from './kiosk/kiosk.component';
import {IndexComponent} from "./index/index.component";
import {ProductAllComponent} from "./product-all/product-all.component";
import {ValidateOrderComponent} from "./validate-order/validate-order.component";
import {LoginComponent} from "../auth/login/login.component";
import {RegisterComponent} from "../auth/register/register.component";
import {authGuard} from "../guards/auth.guard";

const routes: Routes = [
  // Auth routes (outside main layout)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Main application routes (with navbar)
  {
    path: '', component: IndexComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'categories', component: CategoriesSectionComponent },
      { path: 'product/show/:ref', component: ShowProductComponent },
      { path: 'products', component: ProductAllComponent },
      { path: 'kiosk', component: KioskComponent },
      { path: 'validate-order', component: ValidateOrderComponent, canActivate: [authGuard] },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontEndRoutingModule { }
