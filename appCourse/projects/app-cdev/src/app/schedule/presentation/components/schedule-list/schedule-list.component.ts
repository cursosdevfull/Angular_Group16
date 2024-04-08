import { Component, Input } from '@angular/core';

import { IMetadata, TableComponent } from '../../../../shared/components/table/table.component';
import { TSchedule } from '../../pages/schedule-page/schedule-page.component';

@Component({
  selector: 'cdev-schedule-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css',
})
export class ScheduleListComponent {
  @Input('items') dataSource: TSchedule = [];
  @Input('metadata') metadata: IMetadata[] = [];

}
