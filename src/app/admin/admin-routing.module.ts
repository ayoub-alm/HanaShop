import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PatientAllComponent } from './patient-all/patient-all.component';
import { ProductsComponent } from './products/products.component';
import {OrdersComponent} from "./orders/orders.component";
import {OrdersShowComponent} from "./orders-show/orders-show.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {UsersManagementComponent} from "./users-management/users-management.component";
import {CategoriesManagementComponent} from "./categories-management/categories-management.component";
import {adminGuard} from "../guards/auth.guard";

const routes: Routes = [
  {
    path:'', 
    component: IndexComponent,
    canActivate: [adminGuard], // Protect all admin routes
    children:[
      {path:'', component:AdminDashboardComponent},
      {path:'dashboard', component:AdminDashboardComponent},
      {path:'users', component:UsersManagementComponent},
      {path:'categories', component:CategoriesManagementComponent},
      {path:'patient', component:PatientAllComponent},
      {path:'products', component:ProductsComponent},
      {path:'orders', component:OrdersComponent},
      {path:'orders/show', component:OrdersShowComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
