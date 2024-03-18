import { Component } from '@angular/core';

import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'cdev-schedule-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css',
})
export class ScheduleListComponent {}
