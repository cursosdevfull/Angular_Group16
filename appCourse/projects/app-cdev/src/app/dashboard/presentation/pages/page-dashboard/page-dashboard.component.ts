import { Component } from '@angular/core';
import { LayoutService } from '@modules/layout';
import { ContainerComponent, TitleComponent } from '@shared/components';

import { IncomesComponent } from '../../components/incomes/incomes.component';

@Component({
  selector: 'cdev-page-dashboard',
  standalone: true,
  imports: [TitleComponent, ContainerComponent, IncomesComponent],
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css',
})
export class PageDashboardComponent {
  show: boolean = true;
  constructor(private readonly layoutService: LayoutService) {
    this.layoutService.configuration = { showMenu: true, showHeader: true };
  }

  toggle() {
    this.show = !this.show;
    this.layoutService.configuration = {
      showMenu: this.show,
      showHeader: this.show,
    };
  }
}
