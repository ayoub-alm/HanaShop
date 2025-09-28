import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductCategoryService } from '../../../services/ProductCategoryService';
import { BehaviorSubject, pipe, tap } from 'rxjs';
import { ProductCreateDto } from '../../../Dtos/product.create.dto';
import { ProductCategory } from '../../../models/ProductCategory';
@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,MatCheckboxModule
  ],
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
  providers:[ProductCategoryService]
})
export class AddProductsComponent implements OnInit {
  productForm: FormGroup;
  categories: BehaviorSubject<ProductCategory[]> =  new BehaviorSubject<ProductCategory[]>([]);
  selectedFiles: File[] = [];
  loading = false;

  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<AddProductsComponent>);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  data = inject(MAT_DIALOG_DATA);

  constructor(private categoryService: ProductCategoryService) {
    // Initialize form with all fields
    this.productForm = this.fb.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required],
      description: [''],
      state: [true],
      sellerId: [null, Validators.required],
      img: [null]
    });

    if (this.data) {
      this.populateForm(this.data);
    }
  }

  ngOnInit(): void {
    this.categoryService.getProductsCategories().pipe(tap(categorie => {
      this.categories.next(categorie)
    })).subscribe()
  }

  // Populate form with existing data if passed through MAT_DIALOG_DATA
  populateForm(data: any) {
    this.productForm.patchValue(data);
  }

  // Handle file changes
  onFileChange(event: any) {
    const files = event.target.files;
    if (files) {
      this.selectedFiles = Array.from(files);
      this.productForm.patchValue({ img: this.selectedFiles });
    }
  }

  // Submit the form
  onSubmit() {
    if (this.productForm.invalid) {
      this.snackBar.open('Veuillez remplir tous les champs obligatoires', 'Fermer', { duration: 3000 });
      return;
    }

    const formData = new FormData();
    Object.keys(this.productForm.value).forEach(key => {
      if (key === 'img' && this.selectedFiles.length) {
        this.selectedFiles.forEach(file => formData.append('img', file));
      } else {
        formData.append(key, this.productForm.value[key]);
      }
    });

    this.loading = true;

    alert('loading')

    // Example of a POST request to your backend
    this.http.post('/api/products', formData).subscribe({
      next: () => {
        this.snackBar.open('Produit ajouté avec succès', 'Fermer', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (e) => {
        console.log(e);
        
        this.snackBar.open('Erreur lors de l\'ajout du produit', 'Fermer', { duration: 3000 });
      },
      complete: () => (this.loading = false)
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
