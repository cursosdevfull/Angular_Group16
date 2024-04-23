import { Component, Input } from '@angular/core';

import {
  IMetadata,
  TableComponent,
} from '../../../../shared/components/table/table.component';
import { ScheduleEntity } from '../../../application/dtos/schedule.entity';

@Component({
  selector: 'cdev-schedule-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css',
})
export class ScheduleListComponent {
  @Input('items') dataSource: ScheduleEntity[] = [];
  @Input('metadata') metadata: IMetadata[] = [];
}
