import { ModuleWithProviders, NgModule } from '@angular/core';

import { ILayout } from './layout.interface';
import { LayoutService } from './layout.service';
import { LAYOUT_OPTIONS_TOKEN } from './layout.token';

@NgModule()
export class LayoutModule {
  static forRoot(config: ILayout): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: [
        {
          provide: LAYOUT_OPTIONS_TOKEN,
          useValue: config,
        },
        LayoutService,
      ],
    };
  }
}
