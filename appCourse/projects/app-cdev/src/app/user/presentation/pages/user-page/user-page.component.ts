import { Component } from '@angular/core';
import { LayoutService } from '@modules/layout';
import { ContainerComponent, TitleComponent } from '@shared/components';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-om-perfect-scrollbar';

import { ComponentBase } from '../../../../core/classes/component-base';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { IMetadata } from '../../../../shared/components/table/table.component';
import { UserListComponent } from '../../components/user-list/user-list.component';

export interface IUser {
  name: string;
  lastname: string;
  age: number;
  email: string;
}

export type TUser = IUser[];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@Component({
  selector: 'cdev-user-page',
  standalone: true,
  imports: [
    TitleComponent,
    ContainerComponent,
    UserListComponent,
    PerfectScrollbarModule,
    PaginatorComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class UserPageComponent extends ComponentBase<IUser, TUser> {
  dataOriginal: TUser = [
    { name: 'Juan', lastname: 'Perez', age: 25, email: 'juan.perez@email.com' },
    {
      name: 'Maria',
      lastname: 'Gomez',
      age: 30,
      email: 'maria.gomez@email.com',
    },
  ];

  metadata: IMetadata[] = [
    { field: 'name', label: 'Nombre' },
    { field: 'lastname', label: 'Apellido' },
    { field: 'email', label: 'Correo electrónico' },
    { field: 'age', label: 'Edad' },
  ];

  constructor(layoutService: LayoutService) {
    super();
    layoutService.configuration = { showMenu: true, showHeader: true };
    this.loadPage(this.currentPage);
  }
}
