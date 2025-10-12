import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductCategory } from '../../models/ProductCategory';
import { ProductCategoryService } from '../../services/ProductCategoryService';

/**
 * Categories Management Component
 * Admin interface for managing product categories
 */
@Component({
  selector: 'app-categories-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './categories-management.component.html',
  styleUrls: ['./categories-management.component.css']
})
export class CategoriesManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'productsCount', 'actions'];
  dataSource: MatTableDataSource<ProductCategory>;
  categoryForm!: FormGroup;
  totalCategories = 0;
  loading = false;
  isEditing = false;
  editingCategoryId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: ProductCategoryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<ProductCategory>([]);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  /**
   * Initialize category form
   */
  initForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  /**
   * Load all categories from the service
   */
  loadCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.dataSource.data = categories;
        this.totalCategories = categories.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.snackBar.open('Error loading categories', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Filter categories based on search input
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Submit category form (create or update)
   */
  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const categoryData = this.categoryForm.value;

    if (this.isEditing && this.editingCategoryId) {
      // Update existing category
      const updatedCategory: ProductCategory = {
        id: this.editingCategoryId,
        ...categoryData
      };
      
      this.categoryService.updateCategory(updatedCategory).subscribe({
        next: () => {
          this.snackBar.open('Category updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.resetForm();
          this.loadCategories();
        },
        error: (error) => {
          console.error('Error updating category:', error);
          this.snackBar.open('Error updating category', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      // Create new category
      this.categoryService.createCategory(categoryData).subscribe({
        next: () => {
          this.snackBar.open('Category created successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.resetForm();
          this.loadCategories();
        },
        error: (error) => {
          console.error('Error creating category:', error);
          this.snackBar.open('Error creating category', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  /**
   * Edit a category
   */
  editCategory(category: ProductCategory): void {
    this.isEditing = true;
    this.editingCategoryId = category.id;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
  }

  /**
   * Delete a category
   */
  deleteCategory(category: ProductCategory): void {
    if (confirm(`Are you sure you want to delete category: ${category.name}?`)) {
      this.categoryService.deleteCategory(category.id).subscribe({
        next: () => {
          this.snackBar.open(`Category ${category.name} deleted successfully`, 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.loadCategories();
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          this.snackBar.open('Error deleting category', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  /**
   * Reset form to initial state
   */
  resetForm(): void {
    this.categoryForm.reset();
    this.isEditing = false;
    this.editingCategoryId = null;
  }

  /**
   * Get form control for validation
   */
  get f() {
    return this.categoryForm.controls;
  }
}
