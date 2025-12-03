import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-payment-success',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <mat-card class="success-container">
      <h1>🎉 Payment Successful!</h1>
      <p>Your order <strong>#{{ orderId }}</strong> has been placed.</p>

      <button mat-raised-button color="primary"
              [routerLink]="['/orders/details', orderId]">
        View Order Details
      </button>

      <button mat-stroked-button color="accent"
              routerLink="/home">
        Continue Shopping
      </button>
    </mat-card>
  `,
  styles: [`
    .success-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      text-align: center;
    }
    button {
      margin: 10px;
    }
  `]
})
export class PaymentSuccessComponent {

  route = inject(ActivatedRoute);
  orderId = this.route.snapshot.params['orderId'];
}
