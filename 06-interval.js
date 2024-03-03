import "./style.css";

import { interval } from "rxjs";

const observable = interval(2000);

observable.subscribe({
  next: (data) => console.log("suscriptor 1", data),
});

setTimeout(() => {
  observable.subscribe({
    next: (data) => console.log("suscriptor 2", data),
  });
}, 4000);
