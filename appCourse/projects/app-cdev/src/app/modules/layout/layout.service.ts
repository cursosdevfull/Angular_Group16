import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ILayout } from './layout.interface';
import { LAYOUT_OPTIONS_TOKEN } from './layout.token';

@Injectable()
export class LayoutService {
  config: BehaviorSubject<ILayout>;

  constructor(@Inject(LAYOUT_OPTIONS_TOKEN) layout: ILayout) {
    this.config = new BehaviorSubject(layout);
  }

  set configuration(layout: ILayout) {
    this.config.next(layout);
  }

  get configuration(): Observable<ILayout> {
    return this.config;
  }
}
