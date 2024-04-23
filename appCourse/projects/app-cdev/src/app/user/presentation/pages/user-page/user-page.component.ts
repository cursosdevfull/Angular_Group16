import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
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
import { UserEntity } from '../../../application/dtos/user.entity';
import { UserApplication } from '../../../application/user.application';
import { UserFormComponent } from '../../components/user-form/user-form.component';
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
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
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
export class UserPageComponent extends ComponentBase<UserEntity, UserEntity[]> {
  metadata: IMetadata[] = [
    { field: 'userId', label: 'ID' },
    { field: 'name', label: 'Nombre' },
    { field: 'lastname', label: 'Apellido' },
    { field: 'email', label: 'Correo electrónico' },
  ];

  constructor(
    layoutService: LayoutService,
    private readonly application: UserApplication,
    private dialog: MatDialog
  ) {
    super(application);
    layoutService.configuration = { showMenu: true, showHeader: true };
    this.fetchData(this.currentPage);
  }

  openModal(data?: UserEntity) {
    this.dialog.open(UserFormComponent, { panelClass: 'modal-user' });
  }
}
