import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
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
import { ScheduleEntity } from '../../../application/dtos/schedule.entity';
import { ScheduleApplication } from '../../../application/schedule.application';
import { ScheduleFormComponent } from '../../components/schedule-form/schedule-form.component';
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
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
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
export class SchedulePageComponent extends ComponentBase<
  ScheduleEntity,
  ScheduleEntity[]
> {
  metadata: IMetadata[] = [
    { field: 'scheduleId', label: 'ID' },
    { field: 'courseId', label: 'Course' },
    { field: 'title', label: 'Title' },
  ];

  constructor(
    layoutService: LayoutService,
    protected readonly application: ScheduleApplication,
    private dialog: MatDialog
  ) {
    super(application);
    layoutService.configuration = { showMenu: true, showHeader: true };
    this.fetchData(this.currentPage);
  }

  openModal(data?: ScheduleEntity): void {
    this.dialog.open(ScheduleFormComponent, { panelClass: 'modal-schedule' });
  }
}
