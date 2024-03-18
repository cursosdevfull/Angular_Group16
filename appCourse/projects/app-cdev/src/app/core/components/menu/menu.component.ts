import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

export interface IItemMenu {
  icon: string;
  label: string;
  route: string;
}

export type TItemMenu = IItemMenu[];

@Component({
  selector: 'cdev-menu',
  standalone: true,
  imports: [MatListModule, RouterModule, MatButtonModule, MatIconModule, NgFor],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  items: TItemMenu = [
    { icon: 'dashboard', label: 'DASHBOARD', route: '/dashboard' },
    { icon: 'person', label: 'USER', route: '/user' },
    { icon: 'book_2', label: 'COURSE', route: '/course' },
    { icon: 'schedule', label: 'SCHEDULE', route: '/schedule' },
  ];
}
