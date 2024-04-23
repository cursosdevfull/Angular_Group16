import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  IMetadata,
  TableComponent,
} from '../../../../shared/components/table/table.component';
import { CourseEntity } from '../../../application/dtos/course.entity';

@Component({
  selector: 'cdev-course-list',
  standalone: true,
  imports: [NgFor, TableComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent {
  @Input('items') dataSource: CourseEntity[] = [];
  @Input('metadata') metadata: IMetadata[] = [];
}
