import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from '@modules/layout';
import { ContainerComponent, TitleComponent } from '@shared/components';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-om-perfect-scrollbar';

import { ComponentBase } from '../../../../core/classes/component-base';
import { UtilsService } from '../../../../core/services/utils.service';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { IMetadata } from '../../../../shared/components/table/table.component';
import { ScheduleEntity } from '../../../application/dtos/schedule.entity';
import { ScheduleApplication } from '../../../application/schedule.application';
import {
  Schedule,
  ScheduleProperties,
  ScheduleStatus,
} from '../../../domain/schedule';
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
    { field: 'status', label: 'Status' },
  ];

  constructor(
    layoutService: LayoutService,
    protected readonly application: ScheduleApplication,
    private readonly utilsService: UtilsService
  ) {
    super(application);
    layoutService.configuration = { showMenu: true, showHeader: true };
    this.fetchData(this.currentPage);
  }

  openModal(row?: any) {
    const reference: MatDialogRef<ScheduleFormComponent> =
      this.utilsService.openModal(ScheduleFormComponent, {
        panelClass: 'modal-schedule',
        disableClose: true,
        data: row,
      });

    reference.afterClosed().subscribe((data: ScheduleEntity) => {
      if (!data) return;
      data.scheduleId ? this.update(data) : this.insert(data);
    });
  }

  update(data: ScheduleEntity) {
    const props: ScheduleProperties = {
      scheduleId: data.scheduleId,
      courseId: data.courseId,
      title: data.title,
      status: data.status as ScheduleStatus,
    };
    const schedule = new Schedule(props);
    this.application.update(schedule).subscribe((res) => {
      this.fetchData(this.currentPage);
      this.utilsService.showMessage('Schedule updated successfully');
    });
  }

  insert(data: ScheduleEntity) {
    const props: ScheduleProperties = {
      title: data.title,
      courseId: data.courseId,
      status: data.status as ScheduleStatus,
    };
    const schedule = new Schedule(props);
    this.application.create(schedule).subscribe((res) => {
      this.fetchData(this.currentPage);
      this.utilsService.showMessage('Schedule created successfully');
    });
  }

  delete(data: ScheduleEntity) {
    this.utilsService
      .confirm('Do you want to delete this schedule?')
      .subscribe((res) => {
        if (!res) return;

        this.application.delete(data.scheduleId).subscribe((res) => {
          this.fetchData(this.currentPage);
          this.utilsService.showMessage('Schedule deleted successfully');
        });
      });
  }

  export() {
    this.application.getAll().subscribe((res) => {
      const data = res.result.response;
      this.utilsService.exportData(
        data,
        this.metadata,
        'schedules',
        'List of schedules'
      );
    });
  }
}
