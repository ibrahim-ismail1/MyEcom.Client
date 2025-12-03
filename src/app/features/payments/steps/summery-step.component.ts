import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { PaymentService } from '../payments.service';
import { PaymentStateService } from '../../../core/services/payment-state-service';
import { OrderService } from '../../../core/services/order-service';
import { StripeService } from '../../../core/services/stripe-service';

@Component({
    standalone: true,
    selector: 'app-summary-step',
    imports: [
        CommonModule,
        CurrencyPipe,
        MatCardModule,
        MatButtonModule
    ],
    template: `
    <mat-card class="summary-card">

      <h2>Order Summary</h2>

      <h3>Shipping Address</h3>
      <p>
        {{ service.addressData()?.street }},
        {{ service.addressData()?.city }},
        {{ service.addressData()?.country }}
      </p>

      <h3>Delivery</h3>
<p>{{ service.deliveryType() }}</p>

<h3>Payment</h3>
<p>Paid with Stripe</p>

      <h3>Total Amount</h3>
      <p>{{ total | currency }}</p>

      <button mat-raised-button color="primary" (click)="placeOrder()">
        Place Order
      </button>

    </mat-card>
  `
})
export class SummaryStepComponent {

    service = inject(PaymentService);
    paymentState = inject(PaymentStateService);
    orderService = inject(OrderService);
    router = inject(Router);
    stripeService = inject(StripeService);
    get total() {
        return this.paymentState.getTotal();
    }

    

    placeOrder() {

        const addr = this.service.addressData();
        if (!addr) return;

        const shippingAddress = `${addr.street}, ${addr.city}, ${addr.country}`;

        // 1️⃣ Create Order
        this.orderService.createOrder(shippingAddress).subscribe({
            next: (res) => {

                if (!res.isSuccess || !res.result) {
                    console.error("Order creation failed");
                    return;
                }

                const orderId = res.result.id;

                // 2️⃣ Create Checkout Session
                this.stripeService.createCheckoutSession(orderId).subscribe({
                    next: (res) => {
                        window.location.href = res.url;  // 3️⃣ Redirect to Stripe
                    },
                    error: err => console.error("Stripe error:", err)
                });
            },
            error: err => console.error("Order creation error:", err)
        });
    }

}
