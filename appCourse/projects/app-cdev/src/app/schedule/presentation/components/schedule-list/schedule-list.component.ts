import { Component } from '@angular/core';

import { IMetadata, TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'cdev-schedule-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css',
})
export class ScheduleListComponent {
  dataSource = [
    {
      id: 1,
      course: 'Angular',
      date: '2021-10-01',
      time: '10:00',
      duration: '2 hours',
    },
    {
      id: 2,
      course: 'React',
      date: '2021-10-02',
      time: '11:00',
      duration: '3 hours',
    },
    {
      id: 3,
      course: 'Vue',
      date: '2021-10-03',
      time: '12:00',
      duration: '4 hours',
    },
  ];

  metadata: IMetadata[] = [
    { field: 'id', label: 'ID' },
    { field: 'course', label: 'Course' },
    { field: 'date', label: 'Date' },
    { field: 'time', label: 'Time' },
    { field: 'duration', label: 'Duration' },
  ];
}
