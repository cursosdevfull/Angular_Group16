import { Component } from '@angular/core';

import { IMetadata, TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'cdev-user-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  dataSource = [
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

  constructor() {}
}
