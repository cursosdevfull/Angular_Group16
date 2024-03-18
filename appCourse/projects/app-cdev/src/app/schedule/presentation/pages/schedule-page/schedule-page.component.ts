import { Component } from '@angular/core';
import { LayoutService } from '@modules/layout';
import { ContainerComponent, TitleComponent } from '@shared/components';

import { ScheduleListComponent } from '../../components/schedule-list/schedule-list.component';

@Component({
  selector: 'cdev-schedule-page',
  standalone: true,
  imports: [TitleComponent, ContainerComponent, ScheduleListComponent],
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.css',
})
export class SchedulePageComponent {
  constructor(layoutService: LayoutService) {
    layoutService.configuration = { showMenu: true, showHeader: true };
  }
}
