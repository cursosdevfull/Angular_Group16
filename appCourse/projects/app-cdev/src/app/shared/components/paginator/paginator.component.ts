import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import { Paginator } from '../../../core/providers/paginator';

@Component({
  selector: 'cdev-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  providers: [{ provide: MatPaginatorIntl, useClass: Paginator }],
})
export class PaginatorComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 0;
  @Output() onChangePage: EventEmitter<number> = new EventEmitter<number>();

  changePage(ev: PageEvent) {
    this.onChangePage.emit(ev.pageIndex);
  }
}
