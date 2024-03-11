import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';

@Component({
  selector: 'cdev-page-login',
  standalone: true,
  imports: [LottieComponent, LoginComponent, RegisterComponent, RouterModule],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css',
})
export class PageLoginComponent {
  options: AnimationOptions = {
    path: '/assets/lotties/animation.json',
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '80%',
    maxHeight: '100vh',
  };
}
