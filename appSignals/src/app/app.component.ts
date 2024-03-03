import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  productName: string = '';
  productPrice: number = 0;

  constructor(public readonly service: ProductService) {}

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
    return this.service.products.reduce((acc, p) => acc + p.price, 0);
  }
}
