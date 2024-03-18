import { Component } from '@angular/core';
import { LayoutService } from '@modules/layout';
import { ContainerComponent, TitleComponent } from '@shared/components';

import { CourseListComponent } from '../../components/course-list/course-list.component';

export interface ICourse {
  id: number;
  title: string;
  slug: string;
}

export type TCourse = ICourse[];

@Component({
  selector: 'cdev-course-page',
  standalone: true,
  imports: [TitleComponent, ContainerComponent, CourseListComponent],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css',
})
export class CoursePageComponent {
  courses: TCourse = [
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

  constructor(layoutService: LayoutService) {
    layoutService.configuration = { showMenu: true, showHeader: true };
  }
}
