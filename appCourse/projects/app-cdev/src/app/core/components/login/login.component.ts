import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { map } from 'rxjs';

import { IResponseLogin, LoginDto, LoginInfo } from './login.dto';

const KEY_PUBLIC = '6Len6pMpAAAAAHGxLZDXxvPwRLu4W8DjOpdIs13r';

@Component({
  selector: 'cdev-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: KEY_PUBLIC,
      } as RecaptchaSettings,
    },
  ],
})
export class LoginComponent {
  fg: FormGroup;
  fgSecurity: FormGroup;
  next = false;
  public accessToken!: string;
  public refreshToken!: string;

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {
    this.fg = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      recaptchaCode: new FormControl(null, Validators.required),
    });

    this.fgSecurity = new FormGroup({
      token: new FormControl(null, Validators.required),
    });
  }

  login() {
    const { email, password, recaptchaCode } = this.fg.value;
    this.http
      .post<LoginInfo>(
        'https://backend-cursos-dev.h7dtvegsb89r2.us-east-1.cs.amazonlightsail.com/v1/auth/login',
        {
          email,
          password,
          recaptchaCode,
        }
      )
      .pipe(
        map((el: unknown) => LoginDto.fromDataToRequest(el as IResponseLogin))
      )
      .subscribe({
        next: (data: LoginInfo) => {
          this.accessToken = data.accessToken;
          this.refreshToken = data.refreshToken;
          this.next = true;
        },
        error: console.log,
      });
  }

  activate2fa() {
    const { token } = this.fgSecurity.value;
    this.http
      .post<LoginInfo>(
        'https://backend-cursos-dev.h7dtvegsb89r2.us-east-1.cs.amazonlightsail.com/v1/auth/verify-2fa',
        {
          token,
        },
        {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        }
      )
      .pipe(
        map((el: unknown) => LoginDto.fromDataToRequest(el as IResponseLogin))
      )
      .subscribe({
        next: (data: LoginInfo) => {
          this.accessToken = data.accessToken;
          this.refreshToken = data.refreshToken;
          this.router.navigate(['/dashboard']);
        },
        error: console.log,
      });

    //this.router.navigate(['/', 'dashboard']);
  }
}
