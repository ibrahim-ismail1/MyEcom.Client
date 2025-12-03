import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper } from '@angular/material/stepper';

import { PaymentService } from '../payments.service';

@Component({
  standalone: true,
  selector: 'app-address-step',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <form [formGroup]="form" class="step-form">

      <h2>Shipping Address</h2>

      <mat-form-field appearance="outline">
        <mat-label>Street</mat-label>
        <input matInput formControlName="street">
        <mat-error *ngIf="form.controls.street.invalid">Street is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>City</mat-label>
        <input matInput formControlName="city">
        <mat-error *ngIf="form.controls.city.invalid">City is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Country</mat-label>
        <input matInput formControlName="country">
        <mat-error *ngIf="form.controls.country.invalid">Country is required</mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary"
              (click)="next()"
              [disabled]="form.invalid">
        Continue
      </button>

    </form>
  `
})
export class AddressStepComponent {

  @Input() stepper!: MatStepper;

  private fb = inject(FormBuilder);
  private service = inject(PaymentService);

  form = this.fb.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required]
  });

  next() {
    if (!this.form.valid) return;

    this.service.saveAddress({ ...this.form.value });
    console.log("Address saved:", this.service.addressData());

    this.stepper.next();
  }
}

