import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

import { IMetadata, TableComponent } from '../../../../shared/components/table/table.component';
import { TCourse } from '../../pages/course-page/course-page.component';

@Component({
  selector: 'cdev-course-list',
  standalone: true,
  imports: [NgFor, TableComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent {
  @Input('items') dataSource: TCourse = [];

  metadata: IMetadata[] = [
    { field: 'id', label: 'ID' },
    {
      field: 'title',
      label: 'Title',
    },
    {
      field: 'slug',
      label: 'Slug',
    },
  ];
}
