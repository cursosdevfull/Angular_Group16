import { NgFor } from '@angular/common';
import { Component, computed } from '@angular/core';

import { ProductSignalService } from '../product-signal.service';

@Component({
  selector: 'app-app-signals',
  standalone: true,
  imports: [NgFor],
  templateUrl: './app-signals.component.html',
  styleUrl: './app-signals.component.css',
})
export class AppSignalsComponent {
  productName: string = '';
  productPrice: number = 0;

  total = computed(() => this.service.products().length);

  constructor(public readonly service: ProductSignalService) {}

  add() {
    this.service.addProduct(this.productName, this.productPrice);
  }

  remove(id: number) {
    this.service.removeProduct(id);
  }

  saveName(evt: any) {
    this.productName = evt.target.value;
  }

  savePrice(evt: any) {
    this.productPrice = Number(evt.target.value);
  }

  getTotal() {
    //return this.service.products.reduce((acc, p) => acc + p.price, 0);
  }
}
