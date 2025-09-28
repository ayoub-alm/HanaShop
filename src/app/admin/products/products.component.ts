import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductsServices } from '../../services/products.services';
import { ProductModel } from '../../models/product.model';
import { tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProductsComponent } from './add-products/add-products.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatFormFieldModule, MatCheckboxModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsServices]
})
export class ProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [  'id', 'sku','name', 'price','categorie', 'status'];
  dataSource = new MatTableDataSource<ProductModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productsService: ProductsServices,private dialgRef: MatDialog) {}

  ngOnInit(): void {
    // Fetch products from the service and initialize the data source
    this.productsService.getProducts().pipe(
      tap(products => {
        this.dataSource.data = products;
      })
    ).subscribe();
  }

  ngAfterViewInit(): void {
    // Assign paginator and sort to the data source once view is initialized
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openAddProductsDialog(): void{
    this.dialgRef.open(AddProductsComponent,{
      maxWidth:'700px',
      width:'700px'
    })
  }
}



