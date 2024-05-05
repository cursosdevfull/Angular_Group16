import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { LayoutService } from '@modules/layout';
import { ContainerComponent, TitleComponent } from '@shared/components';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-om-perfect-scrollbar';
import { Subscription } from 'rxjs';

import { ComponentBase } from '../../../../core/classes/component-base';
import { UtilsService } from '../../../../core/services/utils.service';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { IMetadata } from '../../../../shared/components/table/table.component';
import {
  INotification,
  SocketService,
} from '../../../../socket/socket.service';
import { CourseApplication } from '../../../application/course.application';
import { CourseEntity } from '../../../application/dtos/course.entity';
import { Course, CourseProperties, CourseStatus } from '../../../domain/course';
import { CourseFormComponent } from '../../components/course-form/course-form.component';
import { CourseListComponent } from '../../components/course-list/course-list.component';

export interface ICourse {
  id: number;
  title: string;
  slug: string;
}

export type TCourse = ICourse[];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@Component({
  selector: 'cdev-course-page',
  standalone: true,
  imports: [
    TitleComponent,
    ContainerComponent,
    CourseListComponent,
    PerfectScrollbarModule,
    PaginatorComponent,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css',
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class CoursePageComponent extends ComponentBase<
  CourseEntity,
  CourseEntity[]
> {
  metadata: IMetadata[] = [
    { field: 'courseId', label: 'ID' },
    {
      field: 'title',
      label: 'Title',
    },
    {
      field: 'slug',
      label: 'Slug',
    },
    {
      field: 'status',
      label: 'Status',
    },
  ];

  subscriptionSocket: Subscription;

  constructor(
    layoutService: LayoutService,
    protected readonly application: CourseApplication,
    private readonly utilsService: UtilsService,
    private readonly socket: SocketService
  ) {
    super(application);
    layoutService.configuration = { showMenu: true, showHeader: true };
    this.fetchData(this.currentPage);

    this.handleSubscription();
  }

  handleSubscription() {
    this.socket.subscribe('course:subscribe');
    this.subscriptionSocket = this.socket
      .getNotifications('NOTIFICATION_COURSE')
      .subscribe(this.getNotifications.bind(this));
  }

  getNotifications(response: INotification) {
    const action = response.action;

    console.log('Notification received', response);

    if (action === 'UPDATE') {
      const { courseId, ...restData } = response.data;
      const course = this.data.find((c) => c.courseId === courseId);

      if (course) {
        course.title = restData.title;
        course.slug = restData.slug;
        course.status = restData.status;
        this.utilsService.showMessage(
          `Course: ${restData.title} updated by another user`
        );
      }
    } else if (action === 'CREATE' || action === 'DELETE') {
      const data = response.data;
      this.fetchData(this.currentPage);
      this.utilsService.showMessage(
        `Course ${data.title} ${
          action === 'CREATE' ? 'created' : 'deleted'
        } by another user`
      );
    }
  }

  openModal(row?: any) {
    const reference: MatDialogRef<CourseFormComponent> =
      this.utilsService.openModal(CourseFormComponent, {
        panelClass: 'modal-course',
        disableClose: true,
        data: row,
      });

    reference.afterClosed().subscribe((data: CourseEntity) => {
      if (!data) return;
      data.courseId ? this.update(data) : this.insert(data);
    });
  }

  update(data: CourseEntity) {
    const props: CourseProperties = {
      courseId: data.courseId,
      title: data.title,
      status: data.status as CourseStatus,
    };
    const course = new Course(props);
    this.application.update(course).subscribe((res) => {
      this.fetchData(this.currentPage);
      this.utilsService.showMessage('Course updated successfully');
    });
  }

  insert(data: CourseEntity) {
    const props: CourseProperties = { title: data.title };
    const course = new Course(props);
    this.application.create(course).subscribe((res) => {
      this.fetchData(this.currentPage);
      this.utilsService.showMessage('Course created successfully');
    });
  }

  delete(data: CourseEntity) {
    this.utilsService
      .confirm('Do you want to delete this course?')
      .subscribe((res) => {
        if (!res) return;

        this.application.delete(data.courseId).subscribe((res) => {
          this.fetchData(this.currentPage);
          this.utilsService.showMessage('Course deleted successfully');
        });
      });
  }

  export() {
    this.application.getAll().subscribe((res) => {
      const data = res.result.response;
      this.utilsService.exportData(
        data,
        this.metadata,
        'courses',
        'List of courses'
      );
    });
  }

  ngOnDestroy() {
    this.socket.subscribe('course:unsubscribe');
    this.subscriptionSocket.unsubscribe();
  }
}
