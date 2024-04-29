import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import {
  IMetadata,
  TableComponent,
} from '../../../../shared/components/table/table.component';
import { CourseEntity } from '../../../application/dtos/course.entity';

@Component({
  selector: 'cdev-course-list',
  standalone: true,
  imports: [
    NgFor,
    TableComponent,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent {
  @Input('items') dataSource: CourseEntity[] = [];
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
