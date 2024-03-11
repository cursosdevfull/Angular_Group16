import { NgClass, NgIf } from '@angular/common';
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
  next = false;

  constructor(private readonly router: Router) {
    this.fg = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      recaptchaCode: new FormControl(null, Validators.required),
    });
  }

  login() {
    console.log(this.fg);
    this.next = true;
  }

  activate2fa() {
    //this.router.navigate(['/', 'dashboard']);
    this.router.navigate(['/dashboard']);
  }
}
