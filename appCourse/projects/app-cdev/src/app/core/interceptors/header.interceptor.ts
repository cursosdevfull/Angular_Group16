import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, mergeMap, throwError } from 'rxjs';

import { AuthApplication } from '../../auth/application/auth.application';
import { ResponseInfo } from '../../auth/infrastructure/dtos/get-new-access-token';
import { StorageApplication } from '../../storage/application/storage.application';

const handleErrorServer = (
  error: HttpErrorResponse,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  auth: AuthApplication,
  storage: StorageApplication
) => {
  if (error.status === 401) {
    auth.logout();
  } else if (error.status === 403) {
    const refreshToken = storage.get('refreshToken') as string;
    return auth.getNewAccessToken(refreshToken).pipe(
      mergeMap((tokens: ResponseInfo) => {
        storage.save('accessToken', tokens.accessToken);
        storage.save('refreshToken', tokens.refreshToken);

        const requestCloned = req.clone({
          headers: req.headers.append(
            'Authorization',
            `Bearer ${tokens.accessToken}`
          ),
        });

        return next(requestCloned);
      })
    );
  }
  return throwError(() => new Error(error.message));
};

export const HeaderInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('URL', req.url);

  if (req.url.includes('auth/login') || req.url.includes('auth/verify-2fa'))
    return next(req);

  const auth = inject(AuthApplication);
  const storage = inject(StorageApplication);
  const token = storage.get('accessToken');
  const requestCloned = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

  return next(requestCloned).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
        return throwError(() => new Error(errorMessage));
      } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        return handleErrorServer(error, req, next, auth, storage);
      }
    })
  );
};
