import { bootstrapApplication } from '@angular/platform-browser';

import { AppSignalsComponent } from './app/app-signals/app-signals.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppSignalsComponent, appConfig).catch((err) =>
  console.error(err)
);
