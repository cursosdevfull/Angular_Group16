import './style.css';

import { debounceTime, fromEvent } from 'rxjs';


const btn = document.querySelector("button")!

const observable = fromEvent(btn, "click")

observable.pipe(debounceTime(1500)).subscribe({
  next: () => console.log("botón presionado")
})