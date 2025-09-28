import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductCategoryService } from '../services/ProductCategoryService';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers:[]
})
export class AdminModule { }
