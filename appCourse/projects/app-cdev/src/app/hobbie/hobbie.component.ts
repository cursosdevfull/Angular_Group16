import { Component, Input } from '@angular/core';

@Component({
  selector: 'cdev-hobbie',
  standalone: true,
  imports: [],
  templateUrl: './hobbie.component.html',
  styleUrl: './hobbie.component.css',
})
export class HobbieComponent {
  @Input() hobby!: string;

  getRandomNumber() {
    return Math.random();
  }
}
