import "./style.css";

import { interval, map } from "rxjs";

const observable = interval(1000);

observable
  .pipe(map((valueReceived) => valueReceived * 3))
  .subscribe((value) => console.log(value));
