import { Component } from '@angular/core';
import { LayoutService } from '@modules/layout';
import { ContainerComponent, TitleComponent } from '@shared/components';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-om-perfect-scrollbar';

import { ComponentBase } from '../../../../core/classes/component-base';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { IMetadata } from '../../../../shared/components/table/table.component';
import { ScheduleListComponent } from '../../components/schedule-list/schedule-list.component';

export interface ISchedule {
  id: number;
  course: string;
  date: string;
  time: string;
  duration: string;
}

export type TSchedule = ISchedule[];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@Component({
  selector: 'cdev-schedule-page',
  standalone: true,
  imports: [
    TitleComponent,
    ContainerComponent,
    ScheduleListComponent,
    PerfectScrollbarModule,
    PaginatorComponent,
  ],
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.css',
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class SchedulePageComponent extends ComponentBase<ISchedule, TSchedule> {
  dataOriginal = [
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

  constructor(layoutService: LayoutService) {
    super();
    layoutService.configuration = { showMenu: true, showHeader: true };
    this.loadPage(this.currentPage);
  }
}
