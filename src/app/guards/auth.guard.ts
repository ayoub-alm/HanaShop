import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return auth.isAuthenticated$.pipe(
    map((isAuthed) => {
      if (isAuthed) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    })
  );
};
