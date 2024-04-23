import { Component, Input } from '@angular/core';

import {
  IMetadata,
  TableComponent,
} from '../../../../shared/components/table/table.component';
import { UserEntity } from '../../../application/dtos/user.entity';

@Component({
  selector: 'cdev-user-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  @Input('items') dataSource: UserEntity[] = [];
  @Input('metadata') metadata: IMetadata[] = [];

  constructor() {}
}
