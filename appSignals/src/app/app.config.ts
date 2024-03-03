import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ProductSignalService } from './product-signal.service';
import { ProductService } from './product.service';

export const appConfig: ApplicationConfig = {
  providers: [ProductService, ProductSignalService, provideRouter(routes)],
};
