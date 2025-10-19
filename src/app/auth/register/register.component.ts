import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';

/**
 * Register Component
 * Handles new user registration
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string = '';
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialize registration form with validators
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      sex: ['', Validators.required],
      birthday: [''],
      addressId: [''],
      agreeTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });

    // Redirect to home if already logged in
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Custom validator to check if passwords match
   */
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    // Stop if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    // Prepare user data
    const userData = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      phoneNumber: this.f['phoneNumber'].value,
      password: this.f['password'].value,
      sex: this.f['sex'].value,
      birthday: this.f['birthday'].value,
      addressId: this.f['addressId'].value
    };

    // Attempt registration
    this.authService.signup(userData)
      .subscribe({
        next: () => {
          // Redirect to home page after successful registration
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
          this.loading = false;
        }
      });
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  /**
   * Toggle confirm password visibility
   */
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
