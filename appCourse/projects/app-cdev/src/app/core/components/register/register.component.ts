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
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { Role } from '../../domain/entities/role';
import { AuthRegister } from '../../domain/roots/auth-register';
import { IResponseRegister, RegisterDto, RegisterInfo } from './register.dto';

/* interface AuthRegister {
  name: string;
  lastname: string;
  email: string;
  password: string;
  image?: string;
  roles: Role[];
} */

@Component({
  selector: 'cdev-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    NgClass,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public readonly fg: FormGroup;
  public readonly fgToken: FormGroup;
  public next = false;
  public qrCode!: string;
  private accessToken!: string;
  private secret!: string;

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {
    this.fg = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ]),
    });

    this.fgToken = new FormGroup({
      token: new FormControl(null, Validators.required),
    });
  }

  register() {
    const { name, lastname, email, password } = this.fg.value;
    const role = new Role('d18d0d20-d686-4520-a33c-e5e7653382bc');

    const authRegister = new AuthRegister(name, lastname, email, password, [
      role,
    ]);

    this.http
      .post<RegisterInfo>(
        'https://backend-cursos-dev.h7dtvegsb89r2.us-east-1.cs.amazonlightsail.com/v1/auth/register',
        authRegister.properties
      )
      .pipe(
        map((info: unknown) =>
          RegisterDto.fromDataToRequest(info as IResponseRegister)
        )
      )
      .subscribe({
        next: (data: RegisterInfo) => {
          this.qrCode = data.qrCode;
          this.secret = data.secret;
          this.accessToken = data.accessToken;
          this.next = true;
        },
        error: console.log,
      });
  }

  activate2fa() {
    const { token } = this.fgToken.value;

    this.http
      .post<RegisterInfo>(
        'https://backend-cursos-dev.h7dtvegsb89r2.us-east-1.cs.amazonlightsail.com/v1/auth/enable-2fa',
        {
          secret: this.secret,
          token,
        },
        {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        }
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/auth/login']);
        },
        error: console.log,
      });
  }
}
