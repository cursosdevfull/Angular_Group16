import { Component } from '@angular/core';
import { LayoutService } from '@modules/layout';
import { ContainerComponent, TitleComponent } from '@shared/components';

import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'cdev-user-page',
  standalone: true,
  imports: [TitleComponent, ContainerComponent, UserListComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent {
  constructor(layoutService: LayoutService) {
    layoutService.configuration = { showMenu: true, showHeader: true };
  }
}
