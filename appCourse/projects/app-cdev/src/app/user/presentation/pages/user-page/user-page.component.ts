import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { LayoutService } from '@modules/layout';
import { ContainerComponent, TitleComponent } from '@shared/components';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-om-perfect-scrollbar';

import { ComponentBase } from '../../../../core/classes/component-base';
import { UtilsService } from '../../../../core/services/utils.service';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { IMetadata } from '../../../../shared/components/table/table.component';
import { UserEntity } from '../../../application/dtos/user.entity';
import { UserApplication } from '../../../application/user.application';
import { User, UserProperties } from '../../../domain/user';
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
    MatTableModule,
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
    private readonly utilsService: UtilsService
  ) {
    super(application);
    layoutService.configuration = { showMenu: true, showHeader: true };
    this.fetchData(this.currentPage);
  }

  openModal(row?: any) {
    const reference: MatDialogRef<UserFormComponent> =
      this.utilsService.openModal(UserFormComponent, {
        panelClass: 'modal-user',
        disableClose: true,
        data: row,
      });

    reference.afterClosed().subscribe((data: UserEntity) => {
      if (!data) return;
      data.userId ? this.update(data) : this.insert(data);
    });
  }

  update(data: UserEntity) {
    const props: UserProperties = {
      userId: data.userId,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      image: data.image,
      password: data.password,
      roles: data.roles,
    };
    const user = new User(props);
    this.application.update(user).subscribe((res) => {
      this.fetchData(this.currentPage);
      this.utilsService.showMessage('User updated successfully');
    });
  }

  insert(data: UserEntity) {
    const props: UserProperties = {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      image: data.image,
      password: data.password,
      roles: data.roles,
    };
    const user = new User(props);
    this.application.create(user).subscribe((res) => {
      this.fetchData(this.currentPage);
      this.utilsService.showMessage('User created successfully');
    });
  }

  delete(data: UserEntity) {
    this.utilsService
      .confirm('Do you want to delete this user?')
      .subscribe((res) => {
        if (!res) return;

        this.application.delete(data.userId).subscribe((res) => {
          this.fetchData(this.currentPage);
          this.utilsService.showMessage('User deleted successfully');
        });
      });
  }

  export() {
    this.application.getAll().subscribe((res) => {
      const data = res.result.response;
      this.utilsService.exportData(
        data,
        this.metadata,
        'users',
        'List of users'
      );
    });
  }
}
