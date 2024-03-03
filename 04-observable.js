import "./style.css";

import { Observable, Observer } from "rxjs";

const observable = new Observable((observer: Observer<string>) => {
  const http = new XMLHttpRequest();
  http.open("get", "https://jsonplaceholder.typicode.com/uses");
  http.onload = (response) => {
    if (http.readyState === 4 && http.status === 200) {
      const users = JSON.parse(http.responseText);
      observer.next(http.responseText);
    } else if (http.readyState === 4 && http.status !== 200) {
      observer.error(http.status);
    } else {
      observer.next(
        JSON.stringify({ status: http.status, readyState: http.readyState })
      );
    }
  };

  http.send();
});

observable.subscribe({
  next: (results) => console.log(results),
  error: (error) => console.log(error),
  complete: () => console.log("complete"),
});
