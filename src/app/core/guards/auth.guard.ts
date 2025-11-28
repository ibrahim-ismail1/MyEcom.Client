import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  // Check the signal value
  if (authService.isAuthenticated()) {
    return true;
  }

  // Not authenticated
  snackBar.open('You must be logged in to access this page', 'Close', { duration: 3000 });
  
  // Redirect to login, passing the return URL so we can go back after login
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
  return false;
};