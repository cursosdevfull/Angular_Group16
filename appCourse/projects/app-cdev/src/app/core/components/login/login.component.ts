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

import { AuthApplication } from '../../../auth/application/auth.application';
import { LoginInfo } from '../../../auth/infrastructure/dtos/login.dto';
import { SocketService } from '../../../socket/socket.service';
import { StorageApplication } from '../../../storage/application/storage.application';

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
  fgLogin!: FormGroup;
  fgToken!: FormGroup;
  next = false;
  public accessToken!: string;
  public refreshToken!: string;

  constructor(
    private readonly router: Router,
    private readonly storage: StorageApplication,
    private readonly authApplication: AuthApplication,
    private readonly socket: SocketService
  ) {}

  login() {
    const { email, password, recaptchaCode } = this.fgLogin.value;
    this.authApplication.login(email, password, recaptchaCode).subscribe({
      next: this.nextLogin.bind(this),
      error: console.log,
    });
  }

  verify2fa() {
    const { token } = this.fgToken.value;
    this.authApplication.verify2fa(token, this.accessToken).subscribe({
      next: this.nextActivate2fa.bind(this),
      error: console.log,
    });
  }

  ngOnInit() {
    this.fgLogin = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      recaptchaCode: new FormControl(null, Validators.required),
    });

    this.fgToken = new FormGroup({
      token: new FormControl(null, Validators.required),
    });
  }

  nextLogin(data: LoginInfo) {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.next = true;
  }

  nextActivate2fa(data: LoginInfo) {
    this.storage.save('accessToken', data.accessToken);
    this.storage.save('refreshToken', data.refreshToken);
    console.log('setInformationUser desde nextActivate2fa');
    this.authApplication.setInformationUser(data.accessToken);
    this.socket.connect();
    this.router.navigate(['/dashboard']);
  }
}
