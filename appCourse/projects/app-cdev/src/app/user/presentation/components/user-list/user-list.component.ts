import { Component, Input } from '@angular/core';

import {
  IMetadata,
  TableComponent,
} from '../../../../shared/components/table/table.component';
import { TUser } from '../../pages/user-page/user-page.component';

@Component({
  selector: 'cdev-user-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  @Input('items') dataSource: TUser = [];
  @Input('metadata') metadata: IMetadata[] = [];

  constructor() {}
}
