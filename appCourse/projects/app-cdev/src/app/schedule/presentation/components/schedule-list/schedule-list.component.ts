import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import {
  IMetadata,
  TableComponent,
} from '../../../../shared/components/table/table.component';
import { ScheduleEntity } from '../../../application/dtos/schedule.entity';

@Component({
  selector: 'cdev-schedule-list',
  standalone: true,
  imports: [
    NgFor,
    TableComponent,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css',
})
export class ScheduleListComponent {
  @Input('items') dataSource: ScheduleEntity[] = [];
  @Input('metadata') metadata: IMetadata[] = [];
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  openModal(row: any) {
    this.onEdit.emit(row);
  }

  delete(row: any) {
    this.onDelete.emit(row);
  }
}
