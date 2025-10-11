import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import path from 'path';
import { PatientAllComponent } from './patient-all/patient-all.component';
import { ProductsComponent } from './products/products.component';
import {OrdersComponent} from "./orders/orders.component";
import {OrdersShowComponent} from "./orders-show/orders-show.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path:'', component: IndexComponent, canActivate: [authGuard], children:[
    {path:'', component:AdminDashboardComponent},
    {path:'patient', component:PatientAllComponent},
    {path:'products', component:ProductsComponent},
    {path:'categories', component:CategoriesComponent},
    {path:'orders', component:OrdersComponent},
    {path:'orders/show', component:OrdersShowComponent},
    {path:'users', component:UsersComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
