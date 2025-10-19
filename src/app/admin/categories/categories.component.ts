import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductCategoryService } from '../../services/ProductCategoryService';
import { ProductCategory } from '../../models/ProductCategory';
import { tap } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [ProductCategoryService]
})
export class CategoriesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'ref'];
  dataSource = new MatTableDataSource<ProductCategory>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService: ProductCategoryService) {}

  ngAfterViewInit(): void {
    this.categoryService.getProductsCategories().pipe(
      tap(categories => {
        this.dataSource.data = categories;
      })
    ).subscribe();

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
}
