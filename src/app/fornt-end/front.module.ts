import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {MatIconModule} from "@angular/material/icon";

import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './footer/footer.component';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { SellerRegisterComponent } from './seller-register/seller-register.component';



@NgModule({
    declarations: [
        ProductCardComponent,
    ],
    imports: [
        RouterModule,
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatChipsModule,
        MatDialogModule,
        MatDialogActions,
    ],
    providers: [],
    exports: [
        
    ],
    bootstrap: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontModule { }
