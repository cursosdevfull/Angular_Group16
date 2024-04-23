import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
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
import { CourseApplication } from '../../../application/course.application';
import { CourseEntity } from '../../../application/dtos/course.entity';
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

  constructor(
    layoutService: LayoutService,
    protected readonly application: CourseApplication,
    private dialog: MatDialog
  ) {
    super(application);
    layoutService.configuration = { showMenu: true, showHeader: true };
    this.fetchData(this.currentPage);
  }

  openModal(row?: CourseEntity) {
    this.dialog.open(CourseFormComponent, { panelClass: 'modal-course' });
  }
}
