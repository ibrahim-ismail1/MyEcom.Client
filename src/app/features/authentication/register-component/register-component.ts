import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MaterialModule } from '../../../shared/material/material-module';

import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-register-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // UI Signals
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  isLoading = signal(false);
  selectedFileName = signal<string | null>(null);
  selectedFile: File | null = null;

  // Custom Validator function
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // If mismatch, return error object { mismatch: true }
    return password === confirmPassword ? null : { mismatch: true };
  }

  registerForm: FormGroup = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]] // Add confirmPassword control
    // We don't bind the file input to Reactive Forms directly for simple file handling
  }, {
    validators: this.passwordMatchValidator // Add validator to the GROUP, not just one control
  });

  togglePassword(event: MouseEvent) {
    event.stopPropagation();
    this.hidePassword.update(val => !val);
  }

  toggleConfirmPassword(event: MouseEvent) {
    event.stopPropagation();
    this.hideConfirmPassword.update(val => !val);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName.set(this.selectedFile.name);
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading.set(true);

    // 1. Prepare FormData (Required for file upload in .NET)
    const formData = new FormData();
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    formData.append('confirmPassword', this.registerForm.get('confirmPassword')?.value);
    formData.append('displayName', this.registerForm.get('displayName')?.value);
    formData.append('phoneNumber', this.registerForm.get('phoneNumber')?.value || '');

    if (this.selectedFile) {
      // Key 'profileImage' must match the property name in your C# RegisterUserVM
      formData.append('profileImage', this.selectedFile);
    }

    // 2. Call Service
    this.authService.register(formData).subscribe({
      next: (isSuccess) => {
        this.isLoading.set(false);
        if (isSuccess) {
          // Navigate to home page on success
          this.router.navigateByUrl('/');
        }
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

}
