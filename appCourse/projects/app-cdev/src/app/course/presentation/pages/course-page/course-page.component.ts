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
export class CoursePageComponent extends ComponentBase<ICourse, TCourse> {
  dataOriginal = [
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
    {
      id: 1,
      title: 'Angular',
      slug: 'angular',
    },
    {
      id: 2,
      title: 'React',
      slug: 'react',
    },
    {
      id: 3,
      title: 'Vue',
      slug: 'vue',
    },
  ];

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

  constructor(layoutService: LayoutService) {
    super();
    layoutService.configuration = { showMenu: true, showHeader: true };
    this.loadPage(this.currentPage);
  }
}
