import { NgClass, NgFor } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface IMetadata {
  field: string;
  label: string;
}

@Component({
  selector: 'cdev-table',
  standalone: true,
  imports: [MatTableModule, NgFor, NgClass],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() metadata: IMetadata[] = [];

  /*   subMetadata = [
    { field: 'lastname', label: 'Apellido' },
    { field: 'age', label: 'Edad de la persona' },
  ]; */

  @Input() dataSource: any[] = [];

  displayedColumns: string[] = [];
  // displayedSubColumns: string[] = ['details'];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metadata']) {
      this.displayedColumns = this.metadata.map((m) => m.field);
      this.dataSource = this.dataSource.map((el) => ({ marked: false, ...el }));
      console.log(this.dataSource);
    }
  }

  selectRow(row: Record<string, string | number | boolean>) {
    row['marked'] = true;
    console.log(row);
  }
}
