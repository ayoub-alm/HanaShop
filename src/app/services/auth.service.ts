import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';

interface AuthResponse {
  token: string;
  user?: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly baseUrl = environment.apiBaseUrl;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  // Returns whether a token exists in storage
  private hasToken(): boolean {
    return !!this.storage.getItem(this.tokenKey);
  }

  // Returns the JWT token if present
  getToken(): string | null {
    return this.storage.getItem(this.tokenKey);
  }

  // Performs login and persists the received token
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((res) => {
        if (res?.token) {
          this.storage.setItem(this.tokenKey, res.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  // Performs signup then logs in automatically if a token is returned
  signup(payload: { name?: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/signup`, payload).pipe(
      tap((res) => {
        if (res?.token) {
          this.storage.setItem(this.tokenKey, res.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  // Clears token and authentication state
  logout(): void {
    this.storage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
  }
}
