import { HttpInterceptorFn } from '@angular/common/http';

/**
 * HTTP Interceptor for Authentication
 * Automatically adds JWT token to outgoing HTTP requests
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the auth token from localStorage
  const authToken = localStorage.getItem('token');

  // Clone the request and add authorization header if token exists
  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next(authReq);
  }

  // If no token, proceed with the original request
  return next(req);
};
