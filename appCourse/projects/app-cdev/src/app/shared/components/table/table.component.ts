import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'cdev-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  dataSource = [
    { name: 'user01', lastname: 'lastname01', age: 20 },
    { name: 'user02', lastname: 'lastname02', age: 30 },
    { name: 'user03', lastname: 'lastname03', age: 40 },
  ];

  displayedColumns: string[] = ['name', 'age', 'lastname'];
}
