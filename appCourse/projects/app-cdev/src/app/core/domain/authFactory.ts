import { err, ok, Result } from 'neverthrow';

import { Auth } from './auth';

export type AuthCreateResult = Result<Auth, Error>;

export class AuthFactory {
  static create(
    name: string,
    lastname: string,
    email: string,
    password: string,
    roles: any[]
  ): AuthCreateResult {
    if (name.trim().length < 3)
      return err(new Error('Name must be at least 3 characters long'));
    if (lastname.trim().length < 3)
      return err(new Error('Lastname must be at least 3 characters long'));
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
      return err(new Error('Email is not valid'));

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/))
      return err(
        new Error(
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number'
        )
      );
    if (roles.length < 1) return err(new Error('Roles must be at least one'));

    return ok(new Auth(name, lastname, email, password, roles));
  }
}
