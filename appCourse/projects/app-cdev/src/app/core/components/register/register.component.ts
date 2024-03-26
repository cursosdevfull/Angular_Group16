import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import { AuthApplication } from '../../application/auth.application';
import { AuthFactory } from '../../domain/authFactory';

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
  fg: FormGroup;
  fgToken: FormGroup;
  next = false;

  constructor(
    private readonly router: Router,
    private readonly application: AuthApplication
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
      secret: new FormControl('ckdkdkddkieie'),
    });
  }

  register() {
    const values = this.fg.value;
    const authCreateResult = AuthFactory.create(
      values.name,
      values.lastname,
      values.email,
      values.password,
      [{ roleId: 1 }]
    );

    if (authCreateResult.isErr()) {
      console.log(authCreateResult.error.message);
      return;
    }

    const auth = authCreateResult.value;
    this.application.register(auth).subscribe({
      next: (data) => console.log(data),
    });

    /* if (auth instanceof Error) {
      console.log(auth.message);
      return;
    } else if (auth instanceof Auth) {
      const application = new AuthApplication();
      console.log(application.register(auth));
    } else {
      console.log('Error');
    } */
  }

  activate2fa() {
    this.router.navigate(['/auth/login']);
  }
}
