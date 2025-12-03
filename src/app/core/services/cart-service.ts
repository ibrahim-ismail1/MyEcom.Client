import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api-service';
import { GetCartDTO } from '../models/cart.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private api = inject(ApiService);

  /**
   * Retrieves the user's cart by userId.
   * Calls: GET /api/cart/user/{userId}
   */
  getUserCart(userId: string): Observable<{ result: GetCartDTO; isSuccess: boolean; errorMessage: string | null }> {
    return this.api.get<{ result: GetCartDTO; isSuccess: boolean; errorMessage: string | null }>(
      `api/cart/user/${userId}`
    );
  }
}
