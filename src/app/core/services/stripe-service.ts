import { Injectable, inject } from '@angular/core';
import { ApiService } from './api-service';
@Injectable({ providedIn: 'root' })
export class StripeService {

  private api = inject(ApiService);

  createCheckoutSession(orderId: number) {
    return this.api.post<{ url: string }>(
      `api/stripe/create-session/${orderId}`,
      {}  // empty body
    );
  }
}
