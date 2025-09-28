import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import path from 'path';
import { PatientAllComponent } from './patient-all/patient-all.component';
import { ProductsComponent } from './products/products.component';
import {OrdersComponent} from "./orders/orders.component";
import {OrdersShowComponent} from "./orders-show/orders-show.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {path:'', component: IndexComponent, children:[
    {path:'', component:AdminDashboardComponent},
    {path:'patient', component:PatientAllComponent},
    {path:'products', component:ProductsComponent},
    {path:'orders', component:OrdersComponent},
    {path:'orders/show', component:OrdersShowComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
