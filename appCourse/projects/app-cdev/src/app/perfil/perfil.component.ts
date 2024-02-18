import { NgFor } from '@angular/common';
import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { HobbieComponent } from '../hobbie/hobbie.component';

@Component({
  selector: 'cdev-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [HobbieComponent, NgFor],
  standalone: true,
})
export class PerfilComponent implements AfterViewInit {
  @ViewChildren(HobbieComponent) listHobbies!: QueryList<HobbieComponent>;

  randomNumber = Math.random();
  list = ['Jugar fútbol', 'Leer', 'Cocinar', 'Pintar', 'Bailar'];

  constructor() {}

  ngAfterViewInit() {
    console.log('Hobbies', this.listHobbies);
    for (const hobby of this.listHobbies.toArray()) {
      console.log(hobby.getRandomNumber());
    }
  }
}
