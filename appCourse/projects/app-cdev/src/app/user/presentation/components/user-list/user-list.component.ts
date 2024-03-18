import { Component } from '@angular/core';

import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'cdev-user-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {}
