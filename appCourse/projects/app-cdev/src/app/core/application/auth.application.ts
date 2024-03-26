import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Auth } from '../domain/auth';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { AuthInfrastructure } from '../infrastructure/auth.infrastructure';

@Injectable()
export class AuthApplication {
  constructor(
    @Inject(AuthInfrastructure) private readonly infrastructure: AuthRepository
  ) {}

  register(auth: Auth): Observable<any> {
    return this.infrastructure.create(auth);
  }
}
