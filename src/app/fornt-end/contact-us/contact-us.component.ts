import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, FormsModule, Validators } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatCardModule ,FormsModule, ReactiveFormsModule,MatInputModule,
MatButtonModule,
    MatCardModule,
    MatFormFieldModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
      alert('Thank you for contacting us!');
      this.contactForm.reset();
    }
  }
}