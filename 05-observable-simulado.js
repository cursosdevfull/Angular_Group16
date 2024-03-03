import "./style.css";

import { Observable, Observer } from "rxjs";

const observable = new Observable((observer: Observer<string>) => {
  setInterval(() => {
    observer.next("mensaje cotidiano");
  }, 1500);

  /*setTimeout(()=>{
    observer.complete()
  }, 8000)

  setTimeout(()=> {
    observer.error("ocurrió un error")
  }, 15000)*/
});

observable.subscribe({
  next: (results) => console.log(results),
  error: (error) => console.log(error),
  complete: () => console.log("complete"),
});

setTimeout(() => {
  observable.subscribe({
    next: (results) => console.log("Segundo suscriptor", results),
  });
}, 4000);
