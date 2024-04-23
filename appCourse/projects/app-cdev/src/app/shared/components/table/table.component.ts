import { NgClass, NgFor } from '@angular/common';
import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MatColumnDef,
  MatTable,
  MatTableModule,
} from '@angular/material/table';

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
  @Input() dataSource: any[] = [];
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ContentChildren(MatColumnDef)
  columnDefs: QueryList<MatColumnDef>;

  displayedColumns: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metadata']) {
      this.displayedColumns = this.metadata.map((m) => m.field);
      this.dataSource = this.dataSource.map((el) => ({ marked: false, ...el }));
    }
    this.ngAfterContentInit();
  }

  selectRow(row: Record<string, string | number | boolean>) {
    row['marked'] = true;
  }

  ngAfterContentInit() {
    console.log('columnDefs', this.columnDefs);
    console.log('length', this.dataSource.length);
    if (!this.columnDefs || this.dataSource.length === 0) return;

    console.log('columnDefs length', this.columnDefs.length);

    this.columnDefs.forEach((columnDef: MatColumnDef) => {
      this.displayedColumns.push(columnDef.name);
      this.table.addColumnDef(columnDef);
    });
  }
}
